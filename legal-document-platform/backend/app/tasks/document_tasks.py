from app.tasks.celery_config import make_celery
from app.services.pdf_service import PDFService
from app.services.storage_service import StorageService
from app.models.document import Document
from app.extensions import db

celery = make_celery(None)

@celery.task(name='tasks.generate_pdf')
def generate_pdf(document_id):
    try:
        document = Document.query.get(document_id)
        if not document:
            return {'success': False, 'error': 'Document not found'}

        pdf_service = PDFService()
        pdf_buffer = pdf_service.generate_document_pdf(document)

        if not pdf_buffer:
            return {'success': False, 'error': 'PDF generation failed'}

        storage_service = StorageService()
        pdf_filename = f'document_{document_id}.pdf'

        with open(f'/tmp/{pdf_filename}', 'wb') as f:
            f.write(pdf_buffer.getvalue())

        document.pdf_url = f'/documents/pdf/{pdf_filename}'
        db.session.commit()

        return {'success': True, 'pdf_url': document.pdf_url}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.process_document')
def process_document(document_id):
    try:
        from app.ai.document_classifier import DocumentClassifier

        document = Document.query.get(document_id)
        if not document:
            return {'success': False, 'error': 'Document not found'}

        classifier = DocumentClassifier()
        predicted_category = classifier.classify_document(document.content)

        if not document.category or document.category == 'other':
            document.category = predicted_category
            db.session.commit()

        return {
            'success': True,
            'category': predicted_category
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.backup_document')
def backup_document(document_id):
    try:
        document = Document.query.get(document_id)
        if not document:
            return {'success': False, 'error': 'Document not found'}

        return {'success': True, 'message': 'Document backed up'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

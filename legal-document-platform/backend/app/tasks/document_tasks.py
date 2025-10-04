from app.services.pdf_service import PDFService
from app.services.notification_service import NotificationService


def generate_document_pdf_task(document_id):
    from app.models.document import Document

    document = Document.query.get(document_id)
    if document:
        pdf_data = PDFService.generate_document_pdf(document)
        return pdf_data
    return None


def process_document_signature(document_id, user_id):
    from app.models.document import Document

    document = Document.query.get(document_id)
    if document:
        document.status = 'signed'
        return True
    return False


def archive_old_documents():
    from app.models.document import Document
    from app.extensions import db
    from datetime import datetime, timedelta

    threshold_date = datetime.utcnow() - timedelta(days=365)

    old_documents = Document.query.filter(
        Document.created_at < threshold_date,
        Document.status == 'completed'
    ).all()

    for doc in old_documents:
        doc.status = 'archived'

    db.session.commit()

    return len(old_documents)

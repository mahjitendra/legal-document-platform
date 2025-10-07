from app.tasks.celery_config import make_celery
from app.models.document import Document
from app.models.notification import Notification
from app.extensions import db
from datetime import datetime, timedelta
import os

celery = make_celery(None)

@celery.task(name='tasks.cleanup_old_notifications')
def cleanup_old_notifications(days=30):
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=days)

        old_notifications = Notification.query.filter(
            Notification.created_at < cutoff_date,
            Notification.is_read == True
        ).all()

        count = len(old_notifications)

        for notification in old_notifications:
            db.session.delete(notification)

        db.session.commit()

        return {
            'success': True,
            'deleted_count': count
        }
    except Exception as e:
        db.session.rollback()
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.cleanup_draft_documents')
def cleanup_draft_documents(days=90):
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=days)

        old_drafts = Document.query.filter(
            Document.status == 'draft',
            Document.updated_at < cutoff_date
        ).all()

        count = len(old_drafts)

        for document in old_drafts:
            db.session.delete(document)

        db.session.commit()

        return {
            'success': True,
            'deleted_count': count
        }
    except Exception as e:
        db.session.rollback()
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.cleanup_temp_files')
def cleanup_temp_files():
    try:
        temp_dir = '/tmp'
        cutoff_time = datetime.now() - timedelta(days=1)

        deleted_count = 0

        for filename in os.listdir(temp_dir):
            if filename.startswith('document_') or filename.startswith('temp_'):
                filepath = os.path.join(temp_dir, filename)

                if os.path.isfile(filepath):
                    file_modified = datetime.fromtimestamp(os.path.getmtime(filepath))

                    if file_modified < cutoff_time:
                        os.remove(filepath)
                        deleted_count += 1

        return {
            'success': True,
            'deleted_count': deleted_count
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.archive_old_documents')
def archive_old_documents(days=365):
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=days)

        old_documents = Document.query.filter(
            Document.status == 'completed',
            Document.updated_at < cutoff_date
        ).all()

        count = len(old_documents)

        for document in old_documents:
            document.status = 'archived'

        db.session.commit()

        return {
            'success': True,
            'archived_count': count
        }
    except Exception as e:
        db.session.rollback()
        return {'success': False, 'error': str(e)}

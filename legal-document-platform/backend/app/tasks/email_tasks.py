from app.tasks.celery_config import make_celery
from app.services.email_service import EmailService
from app.models.user import User

celery = make_celery(None)

@celery.task(name='tasks.send_welcome_email')
def send_welcome_email(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return {'success': False, 'error': 'User not found'}

        email_service = EmailService()
        result = email_service.send_welcome_email(user)

        return {'success': result}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_password_reset_email')
def send_password_reset_email(user_id, reset_token):
    try:
        user = User.query.get(user_id)
        if not user:
            return {'success': False, 'error': 'User not found'}

        email_service = EmailService()
        result = email_service.send_password_reset_email(user, reset_token)

        return {'success': result}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_document_notification_email')
def send_document_notification_email(user_id, document_id):
    try:
        from app.models.document import Document

        user = User.query.get(user_id)
        document = Document.query.get(document_id)

        if not user or not document:
            return {'success': False, 'error': 'User or document not found'}

        email_service = EmailService()
        result = email_service.send_document_signed_email(user, document)

        return {'success': result}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_bulk_emails')
def send_bulk_emails(user_ids, subject, body):
    try:
        email_service = EmailService()
        results = []

        for user_id in user_ids:
            user = User.query.get(user_id)
            if user:
                result = email_service.send_email(user.email, subject, body)
                results.append({'user_id': user_id, 'success': result})

        return {'success': True, 'results': results}
    except Exception as e:
        return {'success': False, 'error': str(e)}

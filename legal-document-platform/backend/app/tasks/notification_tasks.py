from app.tasks.celery_config import make_celery
from app.services.notification_service import NotificationService
from app.services.sms_service import SMSService
from app.models.user import User

celery = make_celery(None)

@celery.task(name='tasks.send_notification')
def send_notification(user_id, notification_type, title, message):
    try:
        notification = NotificationService.create_notification(
            user_id=user_id,
            notification_type=notification_type,
            title=title,
            message=message
        )

        return {
            'success': True,
            'notification_id': notification.id if notification else None
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_sms_notification')
def send_sms_notification(user_id, message):
    try:
        user = User.query.get(user_id)
        if not user or not user.phone:
            return {'success': False, 'error': 'User or phone not found'}

        sms_service = SMSService()
        result = sms_service.send_sms(user.phone, message)

        return result
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_bulk_notifications')
def send_bulk_notifications(user_ids, notification_type, title, message):
    try:
        results = []

        for user_id in user_ids:
            notification = NotificationService.create_notification(
                user_id=user_id,
                notification_type=notification_type,
                title=title,
                message=message
            )

            results.append({
                'user_id': user_id,
                'success': notification is not None
            })

        return {'success': True, 'results': results}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@celery.task(name='tasks.send_reminder_notifications')
def send_reminder_notifications():
    try:
        from app.models.consultation import Consultation
        from datetime import datetime, timedelta

        upcoming_consultations = Consultation.query.filter(
            Consultation.scheduled_at >= datetime.utcnow(),
            Consultation.scheduled_at <= datetime.utcnow() + timedelta(hours=24),
            Consultation.status == 'scheduled'
        ).all()

        for consultation in upcoming_consultations:
            NotificationService.create_notification(
                user_id=consultation.user_id,
                notification_type='consultation',
                title='Consultation Reminder',
                message=f'Your consultation is scheduled at {consultation.scheduled_at}'
            )

        return {
            'success': True,
            'reminders_sent': len(upcoming_consultations)
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

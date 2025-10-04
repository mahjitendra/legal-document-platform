from app.services.notification_service import NotificationService


def send_bulk_email(recipients, subject, body):
    success_count = 0
    failed_count = 0

    for recipient in recipients:
        try:
            NotificationService.send_email(recipient, subject, body)
            success_count += 1
        except Exception as e:
            failed_count += 1

    return {
        'success': success_count,
        'failed': failed_count
    }


def send_reminder_notifications():
    from app.models.consultation import Consultation
    from datetime import datetime, timedelta
    from app.extensions import db

    tomorrow = datetime.utcnow() + timedelta(days=1)

    consultations = Consultation.query.filter(
        Consultation.scheduled_at >= datetime.utcnow(),
        Consultation.scheduled_at <= tomorrow,
        Consultation.status == 'scheduled'
    ).all()

    for consultation in consultations:
        NotificationService.send_email(
            consultation.user.email,
            'Consultation Reminder',
            f'You have a consultation scheduled for tomorrow.'
        )

    return len(consultations)


def cleanup_old_notifications():
    from datetime import datetime, timedelta

    threshold_date = datetime.utcnow() - timedelta(days=30)

    return 0

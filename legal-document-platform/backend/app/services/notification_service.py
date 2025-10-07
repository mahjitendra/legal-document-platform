from app.models.notification import Notification
from app.extensions import db
from datetime import datetime

class NotificationService:
    @staticmethod
    def create_notification(user_id, notification_type, title, message, metadata=None):
        try:
            notification = Notification(
                user_id=user_id,
                type=notification_type,
                title=title,
                message=message,
                metadata=metadata,
                is_read=False,
                created_at=datetime.utcnow()
            )

            db.session.add(notification)
            db.session.commit()

            return notification
        except Exception as e:
            db.session.rollback()
            print(f"Error creating notification: {str(e)}")
            return None

    @staticmethod
    def get_user_notifications(user_id, page=1, per_page=20, unread_only=False):
        query = Notification.query.filter_by(user_id=user_id)

        if unread_only:
            query = query.filter_by(is_read=False)

        return query.order_by(Notification.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def mark_as_read(notification_id, user_id):
        notification = Notification.query.filter_by(
            id=notification_id,
            user_id=user_id
        ).first()

        if notification:
            notification.is_read = True
            db.session.commit()
            return True
        return False

    @staticmethod
    def mark_all_as_read(user_id):
        try:
            Notification.query.filter_by(
                user_id=user_id,
                is_read=False
            ).update({'is_read': True})

            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Error marking notifications as read: {str(e)}")
            return False

    @staticmethod
    def get_unread_count(user_id):
        return Notification.query.filter_by(
            user_id=user_id,
            is_read=False
        ).count()

    @staticmethod
    def notify_document_created(user_id, document_title):
        return NotificationService.create_notification(
            user_id=user_id,
            notification_type='document',
            title='Document Created',
            message=f'Your document "{document_title}" has been created successfully.'
        )

    @staticmethod
    def notify_document_signed(user_id, document_title):
        return NotificationService.create_notification(
            user_id=user_id,
            notification_type='signature',
            title='Document Signed',
            message=f'Document "{document_title}" has been signed successfully.'
        )

    @staticmethod
    def notify_payment_success(user_id, amount):
        return NotificationService.create_notification(
            user_id=user_id,
            notification_type='payment',
            title='Payment Successful',
            message=f'Your payment of ₹{amount} was processed successfully.'
        )

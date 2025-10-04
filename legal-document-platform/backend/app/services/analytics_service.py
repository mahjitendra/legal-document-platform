from app.models.document import Document
from app.models.payment import Payment
from app.models.user import User
from app.extensions import db
from sqlalchemy import func


class AnalyticsService:
    @staticmethod
    def get_dashboard_stats(user_id=None):
        if user_id:
            total_documents = Document.query.filter_by(user_id=user_id).count()
            total_payments = Payment.query.filter_by(user_id=user_id).count()
        else:
            total_documents = Document.query.count()
            total_payments = Payment.query.count()

        total_users = User.query.count()

        return {
            'total_documents': total_documents,
            'total_payments': total_payments,
            'total_users': total_users
        }

    @staticmethod
    def get_document_stats():
        stats = db.session.query(
            Document.status,
            func.count(Document.id)
        ).group_by(Document.status).all()

        return {
            'by_status': {status: count for status, count in stats}
        }

    @staticmethod
    def get_payment_stats():
        total_revenue = db.session.query(
            func.sum(Payment.amount)
        ).filter_by(status='completed').scalar() or 0

        return {
            'total_revenue': total_revenue
        }

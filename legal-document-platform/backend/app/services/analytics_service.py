from app.models.document import Document
from app.models.payment import Payment
from app.models.user import User
from sqlalchemy import func
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    def get_user_analytics(user_id):
        total_documents = Document.query.filter_by(user_id=user_id).count()
        signed_documents = Document.query.filter_by(user_id=user_id, status='signed').count()
        draft_documents = Document.query.filter_by(user_id=user_id, status='draft').count()

        total_payments = Payment.query.filter_by(user_id=user_id).count()
        total_spent = Payment.query.filter_by(
            user_id=user_id,
            status='completed'
        ).with_entities(func.sum(Payment.amount)).scalar() or 0

        return {
            'total_documents': total_documents,
            'signed_documents': signed_documents,
            'draft_documents': draft_documents,
            'total_payments': total_payments,
            'total_spent': float(total_spent)
        }

    @staticmethod
    def get_admin_analytics():
        total_users = User.query.count()
        total_documents = Document.query.count()

        new_users_last_30_days = User.query.filter(
            User.created_at >= datetime.utcnow() - timedelta(days=30)
        ).count()

        total_revenue = Payment.query.filter_by(
            status='completed'
        ).with_entities(func.sum(Payment.amount)).scalar() or 0

        documents_by_status = Document.query.with_entities(
            Document.status,
            func.count(Document.id)
        ).group_by(Document.status).all()

        return {
            'total_users': total_users,
            'total_documents': total_documents,
            'new_users_last_30_days': new_users_last_30_days,
            'total_revenue': float(total_revenue),
            'documents_by_status': dict(documents_by_status)
        }

    @staticmethod
    def get_document_trends(user_id, days=30):
        start_date = datetime.utcnow() - timedelta(days=days)

        documents_per_day = Document.query.filter(
            Document.user_id == user_id,
            Document.created_at >= start_date
        ).with_entities(
            func.date(Document.created_at).label('date'),
            func.count(Document.id).label('count')
        ).group_by(func.date(Document.created_at)).all()

        return [{'date': str(date), 'count': count} for date, count in documents_per_day]

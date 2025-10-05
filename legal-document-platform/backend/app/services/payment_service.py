from app.models.payment import Payment, PaymentStatus
from app.models.transaction import Transaction, TransactionStatus
from app.extensions import db

class PaymentService:
    @staticmethod
    def create_payment_intent(amount, user_id, document_id=None):
        """
        Creates a payment record in the database.
        In a real application, this would also interact with a payment gateway
        to get a client secret.
        """
        if not amount or amount <= 0:
            raise ValueError('A valid amount is required')

        new_payment = Payment(
            amount=amount,
            user_id=user_id,
            document_id=document_id,
            status=PaymentStatus.PENDING
        )
        db.session.add(new_payment)
        db.session.commit()

        # Mocking a client secret that would come from a payment provider
        client_secret = f'mock_secret_for_payment_{new_payment.id}'

        return new_payment, client_secret

    @staticmethod
    def record_transaction(payment, provider, provider_transaction_id, status):
        """
        Records a transaction associated with a payment.
        """
        if not isinstance(status, TransactionStatus):
            raise TypeError("status must be a TransactionStatus enum")

        transaction = Transaction(
            payment_id=payment.id,
            user_id=payment.user_id,
            amount=payment.amount,
            status=status,
            provider=provider,
            provider_transaction_id=provider_transaction_id
        )
        db.session.add(transaction)

        if status == TransactionStatus.COMPLETED:
            payment.status = PaymentStatus.SUCCESSFUL
        elif status == TransactionStatus.FAILED:
            payment.status = PaymentStatus.FAILED

        db.session.commit()
        return transaction
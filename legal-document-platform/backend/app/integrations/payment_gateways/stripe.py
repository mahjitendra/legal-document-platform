import stripe
from app.config import Config

class StripeGateway:
    def __init__(self):
        stripe.api_key = Config.STRIPE_SECRET_KEY

    def create_payment_intent(self, amount, currency='inr'):
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),
                currency=currency,
                automatic_payment_methods={'enabled': True}
            )

            return {
                'success': True,
                'client_secret': intent.client_secret,
                'payment_intent_id': intent.id
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def confirm_payment(self, payment_intent_id):
        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)

            return {
                'success': True,
                'status': intent.status,
                'amount': intent.amount / 100
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def create_customer(self, email, name):
        try:
            customer = stripe.Customer.create(
                email=email,
                name=name
            )

            return {
                'success': True,
                'customer_id': customer.id
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def refund_payment(self, payment_intent_id, amount=None):
        try:
            refund_data = {'payment_intent': payment_intent_id}

            if amount:
                refund_data['amount'] = int(amount * 100)

            refund = stripe.Refund.create(**refund_data)

            return {
                'success': True,
                'refund_id': refund.id,
                'status': refund.status
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

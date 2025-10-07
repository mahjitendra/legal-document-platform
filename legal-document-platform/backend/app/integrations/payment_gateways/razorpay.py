import razorpay
from app.config import Config

class RazorpayGateway:
    def __init__(self):
        self.client = razorpay.Client(
            auth=(Config.RAZORPAY_KEY_ID, Config.RAZORPAY_KEY_SECRET)
        )

    def create_order(self, amount, currency='INR', receipt=None):
        try:
            order_data = {
                'amount': int(amount * 100),
                'currency': currency,
                'receipt': receipt or f'receipt_{int(time.time())}',
                'payment_capture': 1
            }

            order = self.client.order.create(data=order_data)
            return {
                'success': True,
                'order_id': order['id'],
                'amount': order['amount'],
                'currency': order['currency']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def verify_payment(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }

            self.client.utility.verify_payment_signature(params_dict)

            return {'success': True, 'verified': True}
        except razorpay.errors.SignatureVerificationError:
            return {'success': False, 'error': 'Invalid signature'}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def get_payment(self, payment_id):
        try:
            payment = self.client.payment.fetch(payment_id)
            return {
                'success': True,
                'payment': payment
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def refund_payment(self, payment_id, amount=None):
        try:
            refund_data = {}
            if amount:
                refund_data['amount'] = int(amount * 100)

            refund = self.client.payment.refund(payment_id, refund_data)

            return {
                'success': True,
                'refund_id': refund['id']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

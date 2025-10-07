from twilio.rest import Client
from app.config import Config

class TwilioSMS:
    def __init__(self):
        self.client = Client(
            Config.TWILIO_ACCOUNT_SID,
            Config.TWILIO_AUTH_TOKEN
        )
        self.from_number = Config.TWILIO_PHONE_NUMBER

    def send_sms(self, to_number, message):
        try:
            message = self.client.messages.create(
                body=message,
                from_=self.from_number,
                to=to_number
            )

            return {
                'success': True,
                'message_sid': message.sid,
                'status': message.status
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def send_otp(self, phone_number, otp):
        message = f"Your OTP for Legal Document Platform is: {otp}. Valid for 10 minutes."
        return self.send_sms(phone_number, message)

    def send_notification(self, phone_number, notification_text):
        return self.send_sms(phone_number, notification_text)

    def get_message_status(self, message_sid):
        try:
            message = self.client.messages(message_sid).fetch()

            return {
                'success': True,
                'status': message.status,
                'error_code': message.error_code,
                'error_message': message.error_message
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

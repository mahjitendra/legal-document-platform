import requests
from app.config import Config

class SMSService:
    def __init__(self):
        self.api_key = Config.SMS_API_KEY
        self.api_url = Config.SMS_API_URL
        self.sender_id = Config.SMS_SENDER_ID

    def send_sms(self, phone, message):
        try:
            payload = {
                'apikey': self.api_key,
                'numbers': phone,
                'message': message,
                'sender': self.sender_id
            }

            response = requests.post(self.api_url, data=payload)

            if response.status_code == 200:
                return True
            return False
        except Exception as e:
            print(f"Error sending SMS: {str(e)}")
            return False

    def send_otp(self, phone, otp):
        message = f"Your OTP for Legal Document Platform is: {otp}. Valid for 10 minutes."
        return self.send_sms(phone, message)

    def send_document_notification(self, phone, document_title):
        message = f"Your document '{document_title}' is ready for review. Login to view: https://legaldocs.com"
        return self.send_sms(phone, message)

    def send_consultation_reminder(self, phone, consultation_time):
        message = f"Reminder: Your legal consultation is scheduled at {consultation_time}. Join: https://legaldocs.com/consultations"
        return self.send_sms(phone, message)

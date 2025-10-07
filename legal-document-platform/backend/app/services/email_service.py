import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import Config

class EmailService:
    def __init__(self):
        self.smtp_host = Config.MAIL_SERVER
        self.smtp_port = Config.MAIL_PORT
        self.smtp_user = Config.MAIL_USERNAME
        self.smtp_password = Config.MAIL_PASSWORD
        self.from_email = Config.MAIL_DEFAULT_SENDER

    def send_email(self, to_email, subject, body, html=None):
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.from_email
            msg['To'] = to_email

            text_part = MIMEText(body, 'plain')
            msg.attach(text_part)

            if html:
                html_part = MIMEText(html, 'html')
                msg.attach(html_part)

            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)

            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    def send_welcome_email(self, user):
        subject = "Welcome to Legal Document Platform"
        body = f"""
        Hello {user.full_name},

        Welcome to Legal Document Platform! We're excited to have you on board.

        You can now:
        - Create and manage legal documents
        - Use our professional templates
        - Sign documents digitally
        - Consult with legal experts

        Get started: https://legaldocs.com/dashboard

        Best regards,
        Legal Document Platform Team
        """

        return self.send_email(user.email, subject, body)

    def send_password_reset_email(self, user, reset_token):
        subject = "Password Reset Request"
        body = f"""
        Hello {user.full_name},

        We received a request to reset your password.

        Click the link below to reset your password:
        https://legaldocs.com/reset-password?token={reset_token}

        This link will expire in 1 hour.

        If you didn't request this, please ignore this email.

        Best regards,
        Legal Document Platform Team
        """

        return self.send_email(user.email, subject, body)

    def send_document_signed_email(self, user, document):
        subject = "Document Signed Successfully"
        body = f"""
        Hello {user.full_name},

        Your document "{document.title}" has been signed successfully.

        You can download the signed document from your dashboard.

        View document: https://legaldocs.com/documents/{document.id}

        Best regards,
        Legal Document Platform Team
        """

        return self.send_email(user.email, subject, body)

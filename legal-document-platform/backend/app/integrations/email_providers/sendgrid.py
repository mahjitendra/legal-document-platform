from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from app.config import Config

class SendGridEmail:
    def __init__(self):
        self.client = SendGridAPIClient(Config.SENDGRID_API_KEY)
        self.from_email = Config.SENDGRID_FROM_EMAIL

    def send_email(self, to_email, subject, html_content, text_content=None):
        try:
            message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(to_email),
                subject=subject,
                html_content=Content("text/html", html_content)
            )

            if text_content:
                message.plain_text_content = Content("text/plain", text_content)

            response = self.client.send(message)

            return {
                'success': True,
                'status_code': response.status_code
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def send_welcome_email(self, user):
        subject = "Welcome to Legal Document Platform"
        html_content = f"""
        <html>
            <body>
                <h2>Hello {user.full_name},</h2>
                <p>Welcome to Legal Document Platform! We're excited to have you on board.</p>
                <p>You can now:</p>
                <ul>
                    <li>Create and manage legal documents</li>
                    <li>Use our professional templates</li>
                    <li>Sign documents digitally</li>
                    <li>Consult with legal experts</li>
                </ul>
                <p><a href="https://legaldocs.com/dashboard">Get Started</a></p>
                <p>Best regards,<br>Legal Document Platform Team</p>
            </body>
        </html>
        """

        return self.send_email(user.email, subject, html_content)

    def send_password_reset_email(self, user, reset_token):
        subject = "Password Reset Request"
        html_content = f"""
        <html>
            <body>
                <h2>Hello {user.full_name},</h2>
                <p>We received a request to reset your password.</p>
                <p>Click the link below to reset your password:</p>
                <p><a href="https://legaldocs.com/reset-password?token={reset_token}">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best regards,<br>Legal Document Platform Team</p>
            </body>
        </html>
        """

        return self.send_email(user.email, subject, html_content)

    def send_document_notification(self, user, document):
        subject = f"Document Update: {document.title}"
        html_content = f"""
        <html>
            <body>
                <h2>Hello {user.full_name},</h2>
                <p>Your document "<strong>{document.title}</strong>" has been updated.</p>
                <p><a href="https://legaldocs.com/documents/{document.id}">View Document</a></p>
                <p>Best regards,<br>Legal Document Platform Team</p>
            </body>
        </html>
        """

        return self.send_email(user.email, subject, html_content)

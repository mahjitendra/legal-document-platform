import re
from datetime import datetime, timedelta

class FraudDetector:
    def __init__(self):
        self.suspicious_patterns = [
            r'urgent',
            r'immediate action',
            r'verify your account',
            r'click here now',
            r'wire transfer',
            r'western union',
            r'gift card',
            r'lottery',
            r'won.*prize'
        ]

    def check_document_authenticity(self, document_content):
        risk_score = 0
        flags = []

        content_lower = document_content.lower()

        for pattern in self.suspicious_patterns:
            if re.search(pattern, content_lower):
                risk_score += 10
                flags.append(f"Suspicious pattern found: {pattern}")

        if risk_score == 0:
            risk_level = 'low'
        elif risk_score <= 20:
            risk_level = 'medium'
        else:
            risk_level = 'high'

        return {
            'risk_score': risk_score,
            'risk_level': risk_level,
            'flags': flags,
            'is_suspicious': risk_score > 20
        }

    def check_payment_fraud(self, payment_data):
        risk_score = 0
        flags = []

        amount = payment_data.get('amount', 0)
        if amount > 100000:
            risk_score += 20
            flags.append("High transaction amount")

        user_id = payment_data.get('user_id')
        if self._check_multiple_failed_payments(user_id):
            risk_score += 30
            flags.append("Multiple failed payment attempts")

        if risk_score == 0:
            risk_level = 'low'
        elif risk_score <= 30:
            risk_level = 'medium'
        else:
            risk_level = 'high'

        return {
            'risk_score': risk_score,
            'risk_level': risk_level,
            'flags': flags,
            'is_suspicious': risk_score > 30
        }

    def _check_multiple_failed_payments(self, user_id):
        return False

    def analyze_user_behavior(self, user_id, action_type):
        risk_score = 0
        flags = []

        return {
            'risk_score': risk_score,
            'risk_level': 'low',
            'flags': flags,
            'is_suspicious': False
        }

import re
from collections import Counter

class DocumentClassifier:
    def __init__(self):
        self.categories = {
            'rental': ['rent', 'lease', 'tenant', 'landlord', 'property', 'premises'],
            'employment': ['employee', 'employer', 'salary', 'position', 'duties', 'employment'],
            'nda': ['confidential', 'disclosure', 'proprietary', 'trade secret', 'non-disclosure'],
            'sale': ['sale', 'purchase', 'buyer', 'seller', 'consideration', 'transfer'],
            'partnership': ['partner', 'partnership', 'profit', 'loss', 'contribution', 'business'],
            'will': ['will', 'testament', 'beneficiary', 'executor', 'inheritance', 'deceased'],
            'power_of_attorney': ['attorney', 'power', 'agent', 'principal', 'authorize'],
            'affidavit': ['affidavit', 'sworn', 'depose', 'oath', 'affirmation']
        }

    def classify_document(self, content):
        if not content:
            return 'other'

        content_lower = content.lower()
        words = re.findall(r'\b\w+\b', content_lower)

        scores = {}
        for category, keywords in self.categories.items():
            score = sum(1 for keyword in keywords if keyword in words)
            scores[category] = score

        if not any(scores.values()):
            return 'other'

        predicted_category = max(scores, key=scores.get)

        return predicted_category

    def extract_keywords(self, content, top_n=10):
        content_lower = content.lower()
        words = re.findall(r'\b\w+\b', content_lower)

        stop_words = {
            'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or',
            'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'this', 'that'
        }

        filtered_words = [word for word in words if word not in stop_words and len(word) > 3]

        word_freq = Counter(filtered_words)

        return word_freq.most_common(top_n)

    def get_document_summary(self, content, max_length=200):
        sentences = re.split(r'[.!?]+', content)

        sentences = [s.strip() for s in sentences if s.strip()]

        if not sentences:
            return ""

        summary = sentences[0]

        if len(summary) > max_length:
            summary = summary[:max_length] + "..."

        return summary

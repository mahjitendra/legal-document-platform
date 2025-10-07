import re
from datetime import datetime

class TextExtractor:
    @staticmethod
    def extract_dates(text):
        date_patterns = [
            r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}',
            r'\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}',
            r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{2,4}'
        ]

        dates = []
        for pattern in date_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            dates.extend(matches)

        return list(set(dates))

    @staticmethod
    def extract_emails(text):
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        return list(set(emails))

    @staticmethod
    def extract_phone_numbers(text):
        phone_patterns = [
            r'\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
            r'\d{10}',
            r'\+91[-.\s]?\d{10}'
        ]

        phone_numbers = []
        for pattern in phone_patterns:
            matches = re.findall(pattern, text)
            phone_numbers.extend(matches)

        return list(set(phone_numbers))

    @staticmethod
    def extract_amounts(text):
        amount_patterns = [
            r'₹\s*[\d,]+(?:\.\d{2})?',
            r'Rs\.?\s*[\d,]+(?:\.\d{2})?',
            r'INR\s*[\d,]+(?:\.\d{2})?',
            r'\$\s*[\d,]+(?:\.\d{2})?'
        ]

        amounts = []
        for pattern in amount_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            amounts.extend(matches)

        return list(set(amounts))

    @staticmethod
    def extract_names(text):
        name_pattern = r'\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b'
        names = re.findall(name_pattern, text)
        return list(set(names))

    @staticmethod
    def extract_addresses(text):
        address_keywords = [
            'address', 'street', 'road', 'avenue', 'lane', 'building',
            'city', 'state', 'pincode', 'zip'
        ]

        lines = text.split('\n')
        addresses = []

        for i, line in enumerate(lines):
            line_lower = line.lower()
            if any(keyword in line_lower for keyword in address_keywords):
                address_block = []
                for j in range(i, min(i + 4, len(lines))):
                    if lines[j].strip():
                        address_block.append(lines[j].strip())
                    else:
                        break

                if address_block:
                    addresses.append(' '.join(address_block))

        return addresses

    @staticmethod
    def extract_all_entities(text):
        return {
            'dates': TextExtractor.extract_dates(text),
            'emails': TextExtractor.extract_emails(text),
            'phone_numbers': TextExtractor.extract_phone_numbers(text),
            'amounts': TextExtractor.extract_amounts(text),
            'names': TextExtractor.extract_names(text),
            'addresses': TextExtractor.extract_addresses(text)
        }

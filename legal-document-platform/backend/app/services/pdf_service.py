from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import io
from datetime import datetime

class PDFService:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def _setup_custom_styles(self):
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor='#2c3e50',
            spaceAfter=30,
            alignment=TA_CENTER
        ))

        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['BodyText'],
            fontSize=12,
            alignment=TA_JUSTIFY,
            spaceAfter=12
        ))

    def generate_document_pdf(self, document):
        try:
            buffer = io.BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=A4)
            story = []

            title = Paragraph(document.title, self.styles['CustomTitle'])
            story.append(title)
            story.append(Spacer(1, 0.2*inch))

            if document.description:
                desc = Paragraph(f"<b>Description:</b> {document.description}", self.styles['CustomBody'])
                story.append(desc)
                story.append(Spacer(1, 0.2*inch))

            content_lines = document.content.split('\n')
            for line in content_lines:
                if line.strip():
                    p = Paragraph(line, self.styles['CustomBody'])
                    story.append(p)

            story.append(Spacer(1, 0.5*inch))

            footer_text = f"Generated on: {datetime.utcnow().strftime('%B %d, %Y')}"
            footer = Paragraph(footer_text, self.styles['Normal'])
            story.append(footer)

            if document.signature_data:
                story.append(Spacer(1, 0.3*inch))
                sig_text = Paragraph("<b>Digitally Signed</b>", self.styles['Normal'])
                story.append(sig_text)

            doc.build(story)

            buffer.seek(0)
            return buffer
        except Exception as e:
            print(f"Error generating PDF: {str(e)}")
            return None

    def generate_invoice_pdf(self, payment):
        try:
            buffer = io.BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=A4)
            story = []

            title = Paragraph("INVOICE", self.styles['CustomTitle'])
            story.append(title)
            story.append(Spacer(1, 0.3*inch))

            invoice_details = f"""
            <b>Invoice Number:</b> {payment.transaction_id}<br/>
            <b>Date:</b> {payment.created_at.strftime('%B %d, %Y')}<br/>
            <b>Amount:</b> ₹{payment.amount}<br/>
            <b>Status:</b> {payment.status.upper()}
            """
            details = Paragraph(invoice_details, self.styles['CustomBody'])
            story.append(details)

            doc.build(story)

            buffer.seek(0)
            return buffer
        except Exception as e:
            print(f"Error generating invoice PDF: {str(e)}")
            return None

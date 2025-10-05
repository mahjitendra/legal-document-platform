from app.models.signature import Signature
from app.models.document import Document
from app.extensions import db

class SignatureService:
    @staticmethod
    def add_signature(document_id, user_id, signature_data):
        """
        Adds a signature to a document for a specific user.
        """
        if not signature_data:
            raise ValueError('Signature data is required')

        document = Document.query.filter_by(id=document_id).first()
        if not document:
            raise ValueError('Document not found')

        # Enforce that only the document owner can sign the document.
        # For multi-party signing, this logic would need to be expanded.
        if document.user_id != user_id:
            raise PermissionError('User does not have permission to sign this document')

        new_signature = Signature(
            document_id=document_id,
            user_id=user_id,
            signature_data=signature_data
        )
        db.session.add(new_signature)
        db.session.commit()
        return new_signature

    @staticmethod
    def get_signatures_for_document(document_id):
        """
        Retrieves all signatures associated with a document.
        """
        return Signature.query.filter_by(document_id=document_id).all()
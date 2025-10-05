from app.models.document import Document
from app.extensions import db

class DocumentService:
    @staticmethod
    def create_document(title, content, user_id):
        """Creates a new document for a user."""
        if not title or not content:
            raise ValueError('Title and content are required')

        new_document = Document(title=title, content=content, user_id=user_id)
        db.session.add(new_document)
        db.session.commit()
        return new_document

    @staticmethod
    def get_user_documents(user_id):
        """Retrieves all documents for a specific user."""
        return Document.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_document_by_id(document_id, user_id):
        """Retrieves a single document by its ID, ensuring it belongs to the user."""
        return Document.query.filter_by(id=document_id, user_id=user_id).first()

    @staticmethod
    def update_document(document, data):
        """Updates a document's title and content."""
        document.title = data.get('title', document.title)
        document.content = data.get('content', document.content)
        db.session.commit()
        return document

    @staticmethod
    def delete_document(document):
        """Deletes a document from the database."""
        db.session.delete(document)
        db.session.commit()
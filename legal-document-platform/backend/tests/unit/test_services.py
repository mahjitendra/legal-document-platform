import pytest
from app.services.auth_service import AuthService
from app.services.document_service import DocumentService
from app.services.template_service import TemplateService
from app.services.consultation_service import ConsultationService
from app.services.payment_service import PaymentService
from app.services.signature_service import SignatureService
from app.models.user import User
from app.models.document import Document
from app.models.template import Template
from app.models.consultation import Consultation
from app.models.payment import Payment, PaymentStatus
from app.models.transaction import Transaction, TransactionStatus
from app.models.signature import Signature
from app.extensions import db

# AuthService Tests
def test_create_user_service(test_client):
    """
    GIVEN a valid username, email, and password
    WHEN the create_user method is called
    THEN a new user should be created in the database
    """
    user = AuthService.create_user('serviceuser', 'service@test.com', 'password123')
    assert user is not None
    assert user.username == 'serviceuser'
    assert User.query.count() == 1

def test_create_duplicate_user_service(test_client):
    """
    GIVEN an existing user
    WHEN the create_user method is called with the same username
    THEN a ValueError should be raised
    """
    AuthService.create_user('serviceuser', 'service@test.com', 'password123')
    with pytest.raises(ValueError, match='Username already exists'):
        AuthService.create_user('serviceuser', 'another@test.com', 'password456')

def test_authenticate_user_service(test_client):
    """
    GIVEN a user created with a password
    WHEN the authenticate_user method is called with correct credentials
    THEN the user object should be returned
    """
    created_user = AuthService.create_user('authuser', 'auth@test.com', 'password123')
    authenticated_user = AuthService.authenticate_user('authuser', 'password123')
    assert authenticated_user is not None
    assert authenticated_user.id == created_user.id

def test_authenticate_user_wrong_password(test_client):
    """
    GIVEN a user created with a password
    WHEN the authenticate_user method is called with an incorrect password
    THEN None should be returned
    """
    AuthService.create_user('authuser', 'auth@test.com', 'password123')
    authenticated_user = AuthService.authenticate_user('authuser', 'wrongpassword')
    assert authenticated_user is None

# DocumentService Tests
@pytest.fixture
def test_user(test_client):
    """Fixture to create a user for document tests."""
    user = User.query.filter_by(username='docuser').first()
    if not user:
        user = AuthService.create_user('docuser', 'doc@test.com', 'password123')
    return user

def test_create_document_service(test_user):
    """
    GIVEN a user
    WHEN the create_document method is called with valid data
    THEN a new document should be created and associated with the user
    """
    doc = DocumentService.create_document('Test Doc', 'Some content', test_user.id)
    assert doc is not None
    assert doc.title == 'Test Doc'
    assert doc.user_id == test_user.id
    assert Document.query.count() == 1

def test_get_user_documents_service(test_user):
    """
    GIVEN a user with multiple documents
    WHEN the get_user_documents method is called
    THEN a list of all the user's documents should be returned
    """
    DocumentService.create_document('Doc 1', 'Content 1', test_user.id)
    DocumentService.create_document('Doc 2', 'Content 2', test_user.id)
    other_user = AuthService.create_user('otheruser', 'other@test.com', 'password')
    DocumentService.create_document('Other Doc', 'Other content', other_user.id)

    user_docs = DocumentService.get_user_documents(test_user.id)
    assert len(user_docs) == 2
    assert all(d.user_id == test_user.id for d in user_docs)

def test_update_document_service(test_user):
    """
    GIVEN an existing document
    WHEN the update_document method is called with new data
    THEN the document should be updated in the database
    """
    doc = DocumentService.create_document('Old Title', 'Old Content', test_user.id)
    updated_doc = DocumentService.update_document(doc, {'title': 'New Title'})
    assert updated_doc.title == 'New Title'
    assert updated_doc.content == 'Old Content'

def test_delete_document_service(test_user):
    """
    GIVEN an existing document
    WHEN the delete_document method is called
    THEN the document should be removed from the database
    """
    doc = DocumentService.create_document('To Be Deleted', 'Content', test_user.id)
    assert Document.query.count() == 1
    DocumentService.delete_document(doc)
    assert Document.query.count() == 0

# TemplateService Tests
def test_create_template_service(test_client):
    template = TemplateService.create_template('Test Template', 'Template content')
    assert template is not None
    assert template.name == 'Test Template'
    assert Template.query.count() == 1

def test_get_all_templates_service(test_client):
    TemplateService.create_template('Template 1', 'Content 1')
    TemplateService.create_template('Template 2', 'Content 2')
    templates = TemplateService.get_all_templates()
    assert len(templates) == 2

def test_update_template_service(test_client):
    template = TemplateService.create_template('Old Name', 'Old Content')
    updated_template = TemplateService.update_template(template, {'name': 'New Name'})
    assert updated_template.name == 'New Name'

def test_delete_template_service(test_client):
    template = TemplateService.create_template('To Be Deleted', 'Content')
    assert Template.query.count() == 1
    TemplateService.delete_template(template)
    assert Template.query.count() == 0

# ConsultationService Tests
@pytest.fixture
def lawyer_user(test_client):
    """Fixture to create a lawyer (admin) user."""
    user = User.query.filter_by(username='lawyeruser').first()
    if not user:
        user = AuthService.create_user('lawyeruser', 'lawyer@test.com', 'password123')
        user.is_admin = True
        db.session.commit()
    return user

def test_book_consultation_service(test_user, lawyer_user):
    start_time = "2025-01-01T10:00:00"
    end_time = "2025-01-01T11:00:00"
    consultation = ConsultationService.book_consultation(test_user.id, lawyer_user.id, start_time, end_time)
    assert consultation is not None
    assert consultation.user_id == test_user.id
    assert consultation.lawyer_id == lawyer_user.id
    assert Consultation.query.count() == 1

def test_get_user_consultations_service(test_user, lawyer_user):
    start_time = "2025-01-01T10:00:00"
    end_time = "2025-01-01T11:00:00"
    ConsultationService.book_consultation(test_user.id, lawyer_user.id, start_time, end_time)
    consultations = ConsultationService.get_user_consultations(test_user.id)
    assert len(consultations) == 1

# PaymentService Tests
def test_create_payment_intent_service(test_user):
    payment, client_secret = PaymentService.create_payment_intent(1000, test_user.id)
    assert payment is not None
    assert payment.amount == 1000
    assert payment.status == PaymentStatus.PENDING
    assert client_secret.startswith('mock_secret_for_payment_')
    assert Payment.query.count() == 1

def test_record_transaction_service(test_user):
    payment, _ = PaymentService.create_payment_intent(1000, test_user.id)
    transaction = PaymentService.record_transaction(payment, 'stripe', 'pi_123', TransactionStatus.COMPLETED)
    assert transaction is not None
    assert transaction.status == TransactionStatus.COMPLETED
    assert payment.status == PaymentStatus.SUCCESSFUL
    assert Transaction.query.count() == 1

# SignatureService Tests
def test_add_signature_service(test_user):
    doc = DocumentService.create_document('Signature Doc', 'Content', test_user.id)
    signature_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
    signature = SignatureService.add_signature(doc.id, test_user.id, signature_data)
    assert signature is not None
    assert signature.document_id == doc.id
    assert signature.user_id == test_user.id
    assert Signature.query.count() == 1

def test_add_signature_unauthorized_user(test_user):
    """
    GIVEN a document owned by one user
    WHEN another user tries to sign it
    THEN a PermissionError should be raised
    """
    # Create another user
    other_user = AuthService.create_user('otheruser', 'other@test.com', 'password')

    # Create a document owned by test_user
    doc = DocumentService.create_document('Signature Doc', 'Content', test_user.id)

    signature_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"

    # Expect a PermissionError when other_user tries to sign
    with pytest.raises(PermissionError, match='User does not have permission to sign this document'):
        SignatureService.add_signature(doc.id, other_user.id, signature_data)
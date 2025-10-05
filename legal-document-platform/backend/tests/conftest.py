import sys
import os
import pytest
from app import create_app, db

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


@pytest.fixture(scope='module')
def test_client():
    """
    A test client for the app, with a module-scoped database.
    This fixture handles the creation and teardown of the database.
    """
    flask_app = create_app('app.config.TestingConfig')

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            db.create_all()
            yield testing_client  # this is where the testing happens!
            db.session.remove()
            db.drop_all()
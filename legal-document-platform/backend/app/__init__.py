from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate, ma
from .api.v1.auth.routes import auth_bp
from .api.v1.documents.routes import documents_bp
from .api.v1.payments.routes import payments_bp
from .api.v1.signatures.routes import signatures_bp
from .api.v1.consultations.routes import consultations_bp
from .api.v1.admin.routes import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS
    CORS(app)

    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(documents_bp, url_prefix='/api/v1/documents')
    app.register_blueprint(payments_bp, url_prefix='/api/v1/payments')
    app.register_blueprint(signatures_bp, url_prefix='/api/v1/signatures')
    app.register_blueprint(consultations_bp, url_prefix='/api/v1/consultations')
    app.register_blueprint(admin_bp, url_prefix='/api/v1/admin')

    return app
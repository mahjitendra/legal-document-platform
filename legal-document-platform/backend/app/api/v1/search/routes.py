from flask import Blueprint
from .controllers import search_documents, search_templates, global_search
from app.middleware.auth_middleware import token_required

search_bp = Blueprint('search', __name__, url_prefix='/search')

search_bp.route('/documents', methods=['GET'])(token_required(search_documents))
search_bp.route('/templates', methods=['GET'])(token_required(search_templates))
search_bp.route('/global', methods=['GET'])(token_required(global_search))

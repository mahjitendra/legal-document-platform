from flask import jsonify
from werkzeug.exceptions import HTTPException
from app.utils.exceptions import AppException
import traceback

def setup_error_handlers(app):
    @app.errorhandler(AppException)
    def handle_app_exception(error):
        response = {
            'error': error.message,
            'status': error.status_code
        }
        return jsonify(response), error.status_code

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        response = {
            'error': error.description,
            'status': error.code
        }
        return jsonify(response), error.code

    @app.errorhandler(404)
    def handle_404(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(400)
    def handle_400(error):
        return jsonify({'error': 'Bad request'}), 400

    @app.errorhandler(401)
    def handle_401(error):
        return jsonify({'error': 'Unauthorized'}), 401

    @app.errorhandler(403)
    def handle_403(error):
        return jsonify({'error': 'Forbidden'}), 403

    @app.errorhandler(500)
    def handle_500(error):
        app.logger.error(f"Internal server error: {str(error)}")
        app.logger.error(traceback.format_exc())

        return jsonify({
            'error': 'Internal server error',
            'message': 'Something went wrong on our end'
        }), 500

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        app.logger.error(f"Unexpected error: {str(error)}")
        app.logger.error(traceback.format_exc())

        return jsonify({
            'error': 'Unexpected error occurred',
            'message': str(error) if app.debug else 'Please try again later'
        }), 500

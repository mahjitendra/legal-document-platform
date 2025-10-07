import logging
from logging.handlers import RotatingFileHandler
import os
from flask import request, g
import time

def setup_logging(app):
    if not os.path.exists('logs'):
        os.mkdir('logs')

    file_handler = RotatingFileHandler(
        'logs/app.log',
        maxBytes=10240000,
        backupCount=10
    )

    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))

    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Application startup')

    @app.before_request
    def before_request():
        g.start_time = time.time()
        app.logger.info(f'{request.method} {request.path}')

    @app.after_request
    def after_request(response):
        if hasattr(g, 'start_time'):
            elapsed_time = time.time() - g.start_time
            app.logger.info(
                f'{request.method} {request.path} - '
                f'Status: {response.status_code} - '
                f'Time: {elapsed_time:.4f}s'
            )
        return response

    @app.teardown_appcontext
    def teardown_logging(exception=None):
        if exception:
            app.logger.error(f'Error during request: {str(exception)}')

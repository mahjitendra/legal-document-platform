import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app


class FileHandler:
    @staticmethod
    def allowed_file(filename, allowed_extensions):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in allowed_extensions

    @staticmethod
    def save_file(file, folder='uploads'):
        if file and file.filename:
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"

            upload_folder = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'uploads'), folder)
            os.makedirs(upload_folder, exist_ok=True)

            file_path = os.path.join(upload_folder, unique_filename)
            file.save(file_path)

            return {
                'success': True,
                'filename': unique_filename,
                'path': file_path
            }

        return {
            'success': False,
            'error': 'No file provided'
        }

    @staticmethod
    def delete_file(file_path):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
            return False
        except Exception as e:
            return False

    @staticmethod
    def get_file_size(file_path):
        try:
            return os.path.getsize(file_path)
        except Exception:
            return 0

    @staticmethod
    def get_file_extension(filename):
        return filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

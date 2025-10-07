import os
from werkzeug.utils import secure_filename
import uuid
from .constants import ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE

class FileHandler:
    def __init__(self, upload_folder='uploads'):
        self.upload_folder = upload_folder
        self._ensure_upload_folder()

    def _ensure_upload_folder(self):
        if not os.path.exists(self.upload_folder):
            os.makedirs(self.upload_folder)

    def is_allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE_EXTENSIONS

    def is_valid_file_size(self, file):
        file.seek(0, os.SEEK_END)
        size = file.tell()
        file.seek(0)
        return size <= MAX_FILE_SIZE

    def save_file(self, file, subfolder='documents'):
        if not file:
            raise ValueError("No file provided")

        if not self.is_allowed_file(file.filename):
            raise ValueError("File type not allowed")

        if not self.is_valid_file_size(file):
            raise ValueError(f"File size exceeds maximum allowed size of {MAX_FILE_SIZE / (1024 * 1024)}MB")

        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"

        folder_path = os.path.join(self.upload_folder, subfolder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        file_path = os.path.join(folder_path, unique_filename)
        file.save(file_path)

        return {
            'filename': unique_filename,
            'original_filename': filename,
            'path': file_path,
            'size': os.path.getsize(file_path),
            'url': f'/uploads/{subfolder}/{unique_filename}'
        }

    def delete_file(self, file_path):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
            return False
        except Exception as e:
            print(f"Error deleting file: {str(e)}")
            return False

    def get_file_info(self, file_path):
        if not os.path.exists(file_path):
            return None

        return {
            'path': file_path,
            'size': os.path.getsize(file_path),
            'created': os.path.getctime(file_path),
            'modified': os.path.getmtime(file_path)
        }

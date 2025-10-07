import os
from werkzeug.utils import secure_filename
from datetime import datetime
import uuid

class StorageService:
    def __init__(self):
        self.upload_folder = os.environ.get('UPLOAD_FOLDER', 'uploads')
        self.allowed_extensions = {'pdf', 'doc', 'docx', 'txt', 'png', 'jpg', 'jpeg'}

        if not os.path.exists(self.upload_folder):
            os.makedirs(self.upload_folder)

    def allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in self.allowed_extensions

    def save_file(self, file, subfolder='documents'):
        try:
            if not file or not self.allowed_file(file.filename):
                return None

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
                'url': f'/uploads/{subfolder}/{unique_filename}'
            }
        except Exception as e:
            print(f"Error saving file: {str(e)}")
            return None

    def delete_file(self, file_path):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
            return False
        except Exception as e:
            print(f"Error deleting file: {str(e)}")
            return False

    def get_file_url(self, filename, subfolder='documents'):
        return f'/uploads/{subfolder}/{filename}'

    def save_signature(self, signature_data, user_id):
        try:
            folder_path = os.path.join(self.upload_folder, 'signatures', str(user_id))
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)

            filename = f"signature_{uuid.uuid4().hex}.png"
            file_path = os.path.join(folder_path, filename)

            import base64
            if signature_data.startswith('data:image'):
                signature_data = signature_data.split(',')[1]

            with open(file_path, 'wb') as f:
                f.write(base64.b64decode(signature_data))

            return {
                'filename': filename,
                'path': file_path,
                'url': f'/uploads/signatures/{user_id}/{filename}'
            }
        except Exception as e:
            print(f"Error saving signature: {str(e)}")
            return None

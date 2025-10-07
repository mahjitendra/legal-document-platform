from cryptography.fernet import Fernet
import os
import base64
from hashlib import sha256

class EncryptionService:
    def __init__(self):
        self.key = self._get_or_create_key()
        self.cipher = Fernet(self.key)

    def _get_or_create_key(self):
        key_file = 'encryption.key'

        if os.path.exists(key_file):
            with open(key_file, 'rb') as f:
                return f.read()
        else:
            key = Fernet.generate_key()
            with open(key_file, 'wb') as f:
                f.write(key)
            return key

    def encrypt(self, data):
        try:
            if isinstance(data, str):
                data = data.encode()

            encrypted_data = self.cipher.encrypt(data)
            return base64.urlsafe_b64encode(encrypted_data).decode()
        except Exception as e:
            print(f"Encryption error: {str(e)}")
            return None

    def decrypt(self, encrypted_data):
        try:
            if isinstance(encrypted_data, str):
                encrypted_data = encrypted_data.encode()

            decoded_data = base64.urlsafe_b64decode(encrypted_data)
            decrypted_data = self.cipher.decrypt(decoded_data)
            return decrypted_data.decode()
        except Exception as e:
            print(f"Decryption error: {str(e)}")
            return None

    @staticmethod
    def hash_data(data):
        if isinstance(data, str):
            data = data.encode()
        return sha256(data).hexdigest()

    def encrypt_file(self, file_path):
        try:
            with open(file_path, 'rb') as f:
                file_data = f.read()

            encrypted_data = self.cipher.encrypt(file_data)

            encrypted_file_path = file_path + '.encrypted'
            with open(encrypted_file_path, 'wb') as f:
                f.write(encrypted_data)

            return encrypted_file_path
        except Exception as e:
            print(f"File encryption error: {str(e)}")
            return None

    def decrypt_file(self, encrypted_file_path):
        try:
            with open(encrypted_file_path, 'rb') as f:
                encrypted_data = f.read()

            decrypted_data = self.cipher.decrypt(encrypted_data)

            decrypted_file_path = encrypted_file_path.replace('.encrypted', '')
            with open(decrypted_file_path, 'wb') as f:
                f.write(decrypted_data)

            return decrypted_file_path
        except Exception as e:
            print(f"File decryption error: {str(e)}")
            return None

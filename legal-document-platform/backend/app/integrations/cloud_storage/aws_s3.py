import boto3
from botocore.exceptions import ClientError
from app.config import Config
import uuid

class AWSS3Storage:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
            region_name=Config.AWS_REGION
        )
        self.bucket_name = Config.S3_BUCKET_NAME

    def upload_file(self, file_obj, folder='documents'):
        try:
            file_key = f"{folder}/{uuid.uuid4().hex}_{file_obj.filename}"

            self.s3_client.upload_fileobj(
                file_obj,
                self.bucket_name,
                file_key,
                ExtraArgs={'ACL': 'private'}
            )

            return {
                'success': True,
                'file_key': file_key,
                'url': self.get_file_url(file_key)
            }
        except ClientError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def download_file(self, file_key, download_path):
        try:
            self.s3_client.download_file(
                self.bucket_name,
                file_key,
                download_path
            )

            return {'success': True}
        except ClientError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def delete_file(self, file_key):
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=file_key
            )

            return {'success': True}
        except ClientError as e:
            return {
                'success': False,
                'error': str(e)
            }

    def get_file_url(self, file_key, expiration=3600):
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': file_key
                },
                ExpiresIn=expiration
            )

            return url
        except ClientError as e:
            return None

    def list_files(self, prefix=''):
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )

            files = []
            if 'Contents' in response:
                files = [obj['Key'] for obj in response['Contents']]

            return {
                'success': True,
                'files': files
            }
        except ClientError as e:
            return {
                'success': False,
                'error': str(e)
            }

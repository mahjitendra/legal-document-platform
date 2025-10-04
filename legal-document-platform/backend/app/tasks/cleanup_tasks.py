import os
from datetime import datetime, timedelta
from flask import current_app


def cleanup_temp_files():
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    temp_folder = os.path.join(upload_folder, 'temp')

    if not os.path.exists(temp_folder):
        return 0

    deleted_count = 0
    threshold_date = datetime.now() - timedelta(hours=24)

    for filename in os.listdir(temp_folder):
        file_path = os.path.join(temp_folder, filename)

        if os.path.isfile(file_path):
            file_modified_time = datetime.fromtimestamp(os.path.getmtime(file_path))

            if file_modified_time < threshold_date:
                try:
                    os.remove(file_path)
                    deleted_count += 1
                except Exception as e:
                    print(f"Error deleting file {file_path}: {e}")

    return deleted_count


def cleanup_expired_sessions():
    return 0


def cleanup_old_logs():
    logs_folder = 'logs'

    if not os.path.exists(logs_folder):
        return 0

    deleted_count = 0
    threshold_date = datetime.now() - timedelta(days=30)

    for filename in os.listdir(logs_folder):
        if filename.endswith('.log'):
            file_path = os.path.join(logs_folder, filename)
            file_modified_time = datetime.fromtimestamp(os.path.getmtime(file_path))

            if file_modified_time < threshold_date:
                try:
                    os.remove(file_path)
                    deleted_count += 1
                except Exception as e:
                    print(f"Error deleting log file {file_path}: {e}")

    return deleted_count

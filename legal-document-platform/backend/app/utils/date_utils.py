from datetime import datetime, timedelta
import pytz


class DateUtils:
    @staticmethod
    def get_current_datetime():
        return datetime.utcnow()

    @staticmethod
    def format_datetime(dt, format_string='%Y-%m-%d %H:%M:%S'):
        if isinstance(dt, datetime):
            return dt.strftime(format_string)
        return dt

    @staticmethod
    def parse_datetime(date_string, format_string='%Y-%m-%d'):
        try:
            return datetime.strptime(date_string, format_string)
        except ValueError:
            return None

    @staticmethod
    def add_days(dt, days):
        return dt + timedelta(days=days)

    @staticmethod
    def add_hours(dt, hours):
        return dt + timedelta(hours=hours)

    @staticmethod
    def get_date_difference(date1, date2):
        return abs((date2 - date1).days)

    @staticmethod
    def is_past(dt):
        return dt < datetime.utcnow()

    @staticmethod
    def is_future(dt):
        return dt > datetime.utcnow()

    @staticmethod
    def to_local_timezone(dt, timezone='Asia/Kolkata'):
        if dt.tzinfo is None:
            dt = pytz.utc.localize(dt)

        local_tz = pytz.timezone(timezone)
        return dt.astimezone(local_tz)

    @staticmethod
    def get_start_of_day(dt):
        return dt.replace(hour=0, minute=0, second=0, microsecond=0)

    @staticmethod
    def get_end_of_day(dt):
        return dt.replace(hour=23, minute=59, second=59, microsecond=999999)

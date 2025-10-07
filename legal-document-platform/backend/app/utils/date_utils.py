from datetime import datetime, timedelta
import pytz

class DateUtils:
    @staticmethod
    def get_current_datetime(timezone='UTC'):
        tz = pytz.timezone(timezone)
        return datetime.now(tz)

    @staticmethod
    def format_datetime(dt, format='%Y-%m-%d %H:%M:%S'):
        if not dt:
            return None
        return dt.strftime(format)

    @staticmethod
    def parse_datetime(date_string, format='%Y-%m-%d %H:%M:%S'):
        try:
            return datetime.strptime(date_string, format)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def add_days(dt, days):
        return dt + timedelta(days=days)

    @staticmethod
    def add_hours(dt, hours):
        return dt + timedelta(hours=hours)

    @staticmethod
    def add_minutes(dt, minutes):
        return dt + timedelta(minutes=minutes)

    @staticmethod
    def get_date_difference(date1, date2):
        return (date1 - date2).days

    @staticmethod
    def is_past(dt):
        return dt < datetime.utcnow()

    @staticmethod
    def is_future(dt):
        return dt > datetime.utcnow()

    @staticmethod
    def get_start_of_day(dt):
        return dt.replace(hour=0, minute=0, second=0, microsecond=0)

    @staticmethod
    def get_end_of_day(dt):
        return dt.replace(hour=23, minute=59, second=59, microsecond=999999)

    @staticmethod
    def convert_timezone(dt, from_tz='UTC', to_tz='Asia/Kolkata'):
        from_timezone = pytz.timezone(from_tz)
        to_timezone = pytz.timezone(to_tz)

        if dt.tzinfo is None:
            dt = from_timezone.localize(dt)

        return dt.astimezone(to_timezone)

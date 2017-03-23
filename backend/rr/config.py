from rr.secrets import get_secret


class BaseConfig(object):
    SECRET_KEY = get_secret('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = get_secret('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_ECHO = False
    ONESIGNAL_APP_ID = get_secret('ONESIGNAL_APP_ID')
    ONESIGNAL_API_KEY = get_secret('ONESIGNAL_API_KEY')

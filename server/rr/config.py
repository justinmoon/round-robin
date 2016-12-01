from rr.secrets import get_secret

class BaseConfig(object):
    SECRET_KEY = get_secret('SECRET_KEY')
    DEBUG = get_secret('DEBUG')
    DB_NAME = get_secret('DB_NAME')
    DB_USER = get_secret('DB_USER')
    DB_PASS = get_secret('DB_PASS')
    DB_SERVICE = get_secret('DB_SERVICE')
    DB_PORT = get_secret('DB_PORT')
    SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
        DB_USER, DB_PASS, DB_SERVICE, DB_PORT, DB_NAME
    )

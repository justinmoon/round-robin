from rr.secrets import get_secret

class BaseConfig(object):
    SECRET_KEY = get_secret('SECRET_KEY')
    DEBUG = get_secret('DEBUG')
    DB_USER = get_secret('DB_USER')
    DB_PASS = get_secret('DB_PASS')
    DB_SERVICE = get_secret('DB_SERVICE')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{0}:{1}@{2}'.format(
        DB_USER, DB_PASS, DB_SERVICE
    )
    SQLALCHEMY_ECHO = True
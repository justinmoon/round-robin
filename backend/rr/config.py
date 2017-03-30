import os


class BaseConfig(object):
    SQLALCHEMY_ECHO = False
    RQ_REDIS_URL = 'redis://localhost:6379/0'


class DevConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://user:password@localhost/'
            'round_robin_dev')
    ONESIGNAL_APP_ID = 'a01d57b3-098d-4442-8da0-3c901a0fdecc'
    ONESIGNAL_API_KEY = 'ZWI1ZDhjYWQtNWFmNC00ODk3LWEzNGItNjZjYTMzMzM2NjEy'
    RQ_ASYNC = False


class TestConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://user:password@localhost/'
            'round_robin_test')
    RQ_ASYNC = False


class ProdConfig(BaseConfig):
    ...


config_map = {
    'dev': 'rr.config.DevConfig',
    'test': 'rr.config.TestConfig',
    'prod': 'rr.config.ProdConfig'
}

secrets_map = {
    'dev': 'rr.secrets.DevSecrets',
    'test': 'rr.secrets.TestSecrets',
    'prod': 'rr.secrets.ProdSecrets',
}


def configure(app):
    env = os.environ['CONFIG_ENV']
    # First, load config
    app.config.from_object(config_map[env])
    # Override with secrets
    app.config.from_object(secrets_map[env])

import os


class ProductionSecrets:
    DEBUG=False
    SECRET_KEY='5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    DB_USER = 'postgres'
    DB_NAME='postgres'
    DB_PASS='postgres'
    DB_SERVICE='postgres'
    DB_PORT=5432

class DevelopmentSecrets:
    DEBUG=True
    SECRET_KEY='5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    DB_USER = 'postgres'
    DB_NAME='postgres'
    DB_PASS='postgres'
    DB_SERVICE='postgres'

class StagingSecrets:
    DEBUG=False

class TestSecrets:
    DEBUG=False

    SECRET_KEY='5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    DB_USER = 'postgres'
    DB_NAME='postgres'
    DB_PASS='postgres'
    DB_SERVICE='postgres'

def get_env():
    return os.environ.get('CONFIG_ENV', 'dev')

def get_secret(key):
    env = get_env()
    assert env in ('dev', 'test', 'stage', 'prod')
    secrets = {
        'prod': ProductionSecrets,
        'test': TestSecrets,
        'dev': DevelopmentSecrets,
        'stage': StagingSecrets,
    }
    thing = secrets.get(env)
    return getattr(thing, key)

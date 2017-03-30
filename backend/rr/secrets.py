class DevSecrets:
    SECRET_KEY = '5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://user:password@localhost/'
            'round_robin_dev')
    ONESIGNAL_APP_ID = 'a01d57b3-098d-4442-8da0-3c901a0fdecc'
    ONESIGNAL_API_KEY = 'ZWI1ZDhjYWQtNWFmNC00ODk3LWEzNGItNjZjYTMzMzM2NjEy'
    RQ_ASYNC = False
    RQ_ASYNC = True


class TestSecrets:
    SECRET_KEY = '5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://user:password@localhost/'
            'round_robin_test')
    RQ_ASYNC = False


class ProdSecrets:
    SECRET_KEY = '5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d'
    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://root:password@/prod?unix_socket=/cloudsql/'
            'round-robin-prod:us-central1:app-engine')
    ONESIGNAL_APP_ID = '3e14e653-4dc6-4331-95e3-e3d8703bd206'
    ONESIGNAL_API_KEY = 'NmE1MTg2MmQtNWQ4Zi00NTE4LTkwYzQtOTcwOTQ5ODBjODNk'

    RQ_REDIS_URL = 'redis://:jCAcVmpKW3nbehN@redis-18510.c9.us-east-1-2.ec2.cloud.redislabs.com:18510'

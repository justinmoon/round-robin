import os

from flask import Flask
from raven.contrib.flask import Sentry

from rr.db import db
from rr.config import BaseConfig
from rr.routes import routes
from rr.auth import auth, login_manager
from rr.custom_json_encoder import CustomJSONEncoder

def create_app(name, settings_override={}):
    app = Flask(name)
    app.json_encoder = CustomJSONEncoder
    app.config.from_object(BaseConfig)
    app.config.update(settings_override)
    app.register_blueprint(routes)
    app.register_blueprint(auth)
    db.init_app(app)
    login_manager.init_app(app)

    if os.environ['CONFIG_ENV'] == 'prod':
        sentry = Sentry(app, dsn='https://085ef39a06a049a990ff23598bffbf86:dae4cd15384747f5aec4aae8bfc4eb34@sentry.io/124868?timeout=10')
    else:
        sentry = Sentry(app)

    sentry.init_app(app)

    return app

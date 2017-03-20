import os

from flask import Flask
from flask_migrate import Migrate
from raven.contrib.flask import Sentry

from rr.db import db
from rr.config import BaseConfig
from rr.routes import routes
from rr.auth import auth, login_manager
from rr.custom_json_encoder import CustomJSONEncoder
from rr.admin import admin
from rr.static import static

migrate = Migrate()

def create_app(name, settings_override={}):
    app = Flask(name, static_folder='build/static', static_url_path='/static')

    app.json_encoder = CustomJSONEncoder
    app.config.from_object(BaseConfig)
    app.config.update(settings_override)
    app.register_blueprint(routes, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(static)

    migrate.init_app(app, db)
    db.init_app(app)
    login_manager.init_app(app)
    admin.init_app(app)

    if os.environ['CONFIG_ENV'] == 'prod':
        sentry = Sentry(app, dsn='https://085ef39a06a049a990ff23598bffbf86:dae4cd15384747f5aec4aae8bfc4eb34@sentry.io/124868?timeout=10')
    else:
        sentry = Sentry(app)
    sentry.init_app(app)

    return app

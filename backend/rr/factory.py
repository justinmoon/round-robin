import os
import rq_dashboard

from flask import Flask
from flask_migrate import Migrate
from raven.contrib.flask import Sentry

from rr.db import db
from rr.config import configure
from rr.routes import routes
from rr.auth import auth, login_manager
from rr.custom_json_encoder import CustomJSONEncoder
from rr.admin import admin
from rr.static import static
from rr.jobs import rq


migrate = Migrate()


def create_app(name, settings_override={}):
    app = Flask(name, static_folder='build/static', static_url_path='/static')

    configure(app)
    app.json_encoder = CustomJSONEncoder
    app.config.update(settings_override)
    app.register_blueprint(routes, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(static)
    app.register_blueprint(rq_dashboard.blueprint, url_prefix="/rq")

    migrate.init_app(app, db)
    db.init_app(app)
    login_manager.init_app(app)
    admin.init_app(app)
    rq.init_app(app)

    if os.environ.get('CONFIG_ENV') == 'prod':
        sentry = Sentry(
            app,
            dsn=('https://085ef39a06a049a990ff23598bffbf86:dae4cd15384747f5aec4'
                'aae8bfc4eb34@sentry.io/124868')
        )
    else:
        sentry = Sentry(app)
    sentry.init_app(app)

    return app

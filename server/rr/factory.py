from flask import Flask

from rr.db import db
from rr.config import BaseConfig
from rr.routes import routes

def create_app(name, settings_override={}):
    app = Flask(name)
    app.config.from_object(BaseConfig)
    app.config.update(settings_override)
    app.register_blueprint(routes)
    db.init_app(app)

    return app
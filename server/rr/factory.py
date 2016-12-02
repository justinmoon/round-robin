from flask import Flask

from rr.db import db
from rr.config import BaseConfig
from rr.routes import routes
from rr.auth import auth
from rr.json import CustomJSONEncoder

def create_app(name, settings_override={}):
    app = Flask(name)
    app.json_encoder = CustomJSONEncoder
    app.config.from_object(BaseConfig)
    app.config.update(settings_override)
    app.register_blueprint(routes)
    app.register_blueprint(auth)
    db.init_app(app)

    return app
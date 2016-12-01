from flask import Flask

from rr.db import db
from rr.config import BaseConfig
from rr.routes import routes

app = Flask(__name__)
app.config.from_object(BaseConfig)
app.register_blueprint(routes)

db.init_app(app)

if __name__ == '__main__':
    app.run()

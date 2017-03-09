from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

import rr.seed
import rr.models as m
from rr.db import db

from flask import current_app


if __name__ == '__main__':
    from rr.app import app
    from rr.db import db
    migrate = Migrate(app, db)

    manager = Manager(app)
    manager.add_command('db', MigrateCommand)

    @manager.command
    def seed():
        db.drop_all()
        db.create_all()

        rr.seed.create_users()
        rr.seed.create_prompts()
        rr.seed.create_compositions()

    @manager.command
    def test():
        print('user count: ', db.session.query(m.User).count())
        print('prompt count: ', db.session.query(m.Prompt).count())
        print('composition count: ', db.session.query(m.Composition).count())

    manager.run()
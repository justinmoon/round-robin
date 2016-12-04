from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand


if __name__ == '__main__':
    from rr.app import app
    from rr.db import db
    migrate = Migrate(app, db)

    manager = Manager(app)
    manager.add_command('db', MigrateCommand)

    manager.run()
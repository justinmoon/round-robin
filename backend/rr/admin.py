from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

import rr.models as m
from rr.db import db

admin = Admin(name='microblog', template_mode='bootstrap3')
admin.add_view(ModelView(m.User, db.session))
admin.add_view(ModelView(m.Prompt, db.session))
admin.add_view(ModelView(m.Composition, db.session))

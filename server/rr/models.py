import uuid
from rr.db import db
from rr.guid import GUID

class Composition(db.Model):
    id = db.Column('id', GUID, default=uuid.uuid4, primary_key=True)
    created_at = db.Column('create_date', db.DateTime, default=db.func.now())

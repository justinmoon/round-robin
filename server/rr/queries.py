from rr.db import db

from rr.models import User, Prompt, Composition

def user_by_fb_id(fb_id):
    return db.session.query(User)\
        .filter_by(fb_id=fb_id)\
        .scalar()


def users_by_fb_ids(fb_ids):
    return db.session.query(User)\
        .filter(User.fb_id.in_(fb_ids))


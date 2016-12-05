from datetime import datetime, timedelta
from rr.db import db

from rr.models import User, Prompt, Composition

def user_by_fb_id(fb_id):
    return db.session.query(User)\
        .filter_by(fb_id=fb_id)\
        .scalar()


def users_by_fb_ids(fb_ids):
    return db.session.query(User)\
        .filter(User.fb_id.in_(fb_ids))

def get_prompts():
    return db.session.query(Prompt)


def create_composition(*, prompt_id, user_id, body):
    c = Composition(
        user_id=user_id,
        prompt_id=prompt_id,
        body=body
    )
    db.session.add(c)
    db.session.commit()
    return c

def construct_feed():
    one_day_ago = datetime.now() - timedelta(days=1)
    return db.session.query(Composition)\
        .filter(Composition.created_at > one_day_ago)


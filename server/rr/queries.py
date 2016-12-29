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


def construct_feed():
    one_day_ago = datetime.now() - timedelta(days=1)
    return db.session.query(Composition) \
        .filter(Composition.created_at > one_day_ago)\
        .order_by(Composition.created_at.desc())


def create_composition(created_at=datetime.now(), *, prompt_id, user_id, body):
    c = Composition(
        user_id=user_id,
        created_at=created_at,
        prompt_id=prompt_id,
        body=body,
    )
    db.session.add(c)
    db.session.commit()
    return c


def create_prompt(*, date, prompt):
    p = Prompt(
        date=date,
        prompt=prompt,
    )
    db.session.add(p)
    db.session.commit()
    return p


def create_user(*, name, pic_url, fb_access_token, fb_id):
    u = User(
        name=name,
        pic_url=pic_url,
        fb_access_token=fb_access_token,
        fb_id=fb_id,
    )
    db.session.add(u)
    db.session.commit()
    return u




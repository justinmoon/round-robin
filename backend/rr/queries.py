from sqlalchemy.sql import not_
from sqlalchemy import func, TIME
from datetime import datetime, timedelta, time
from rr.db import db, convert_tz

from rr.models import User, Prompt, Composition


def get_user(current_user):
    return db.session.query(User).get(current_user.id)


def get_user_by_id(user_id):
    return db.session.query(User).get(user_id)


def all_users():
    return db.session.query(User).all()


def user_by_fb_id(fb_id):
    return db.session.query(User)\
        .filter_by(fb_id=fb_id)\
        .scalar()


def users_by_fb_ids(fb_ids):
    return db.session.query(User)\
        .filter(User.fb_id.in_(fb_ids))


def users_who_have_not_written_yet():
    one_day_ago = datetime.utcnow() - timedelta(days=1)
    subquery = db.session.query(Composition.user_id)\
        .filter(Composition.created_at > one_day_ago)\
        .distinct()\
        .subquery()
    return db.session.query(User)\
        .filter(not_(User.id.in_(subquery)))\
        .all()


def get_prompts():
    return db.session.query(Prompt)


def get_prompt_by_date(date):
    return db.session.query(Prompt).filter_by(date=date).one()


def construct_feed(user):
    one_day_ago = datetime.utcnow() - timedelta(days=1)
    return db.session.query(Composition) \
        .filter(Composition.created_at > one_day_ago)\
        .filter(Composition.user_id != user.id)\
        .order_by(Composition.created_at.desc())


def current_user_compositions(user):
    return db.session.query(Composition) \
        .filter(Composition.user_id == user.id)\
        .order_by(Composition.created_at.desc())


def create_composition(created_at=None, *, prompt_id, user_id, body):
    created_at = created_at if created_at is not None else datetime.utcnow()
    c = Composition(
        user_id=user_id,
        created_at=created_at,
        prompt_id=prompt_id,
        body=body, )
    db.session.add(c)
    db.session.commit()
    return c


def create_prompt(*, date, prompt):
    p = Prompt(
        date=date,
        prompt=prompt, )
    db.session.add(p)
    db.session.commit()
    return p


def create_user(created_at=None, *, name, pic_url, fb_access_token, fb_id):
    created_at = created_at if created_at is not None else datetime.now()
    u = User(
        created_at=created_at,
        name=name,
        pic_url=pic_url,
        fb_access_token=fb_access_token,
        fb_id=fb_id, )
    db.session.add(u)
    db.session.commit()
    return u


#  def local_time_for_user(user):
    #  query = select([User.id, convert_tz(func.now(), 'UTC', User.timezone)])
    #  return db.session.execute(query)

def get_midnight_users():
    return db.session.query(User)\
            .filter(func.cast(convert_tz(func.now(), 'UTC', User.timezone), TIME) < time(hour=1))\
            .all()

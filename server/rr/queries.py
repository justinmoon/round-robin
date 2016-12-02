from rr.db import db
from rr import queries as q

from rr.models import User, Prompt, Composition

def user_by_fb_id(fb_id):
    return db.session.query(User)\
        .filter_by(fb_id==fb_id)\
        .scalar()


def user_by_fb_ids(fb_ids):
    return db.session.query(User)\
        .filter(User.fb_id.in_(fb_ids))


def make_user(*, fb_id, fb_access_token, name, pic_url, fb_friend_ids):
    u = User(
        fb_id=fb_id,
        fb_access_token=fb_access_token,
        name=name,
        pic_url=pic_url,
    )

    u.friends = q.users_by_facebook_ids(*fb_friend_ids)

    db.session.add(u)
    db.session.commit()

    return u
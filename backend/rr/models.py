import datetime
from flask_login import UserMixin
from rr.db import db

friendship = db.Table('friendships', db.metadata,
                      db.Column(
                          'friend_a_id',
                          db.Integer,
                          db.ForeignKey('users.id'),
                          primary_key=True),
                      db.Column(
                          'friend_b_id',
                          db.Integer,
                          db.ForeignKey('users.id'),
                          primary_key=True))


class ScheduledOnesignalNotification(db.Model):
    __tablename__ = 'scheduled_onesignal_notifications'
    id = db.Column('id', db.Integer, primary_key=True)
    onesignal_id = db.Column('onesignal_id', db.String(50), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column('id', db.Integer, primary_key=True)
    fb_id = db.Column('fb_id', db.String(1000), unique=True)
    fb_access_token = db.Column(
        'fb_access_token', db.String(1000), nullable=False)
    created_at = db.Column('created_at', db.DateTime,
                           default=datetime.datetime.utcnow)
    name = db.Column('name', db.String(1000), nullable=False)
    pic_url = db.Column('pic_url', db.String(1000), nullable=False)
    compositions = db.relationship(
        'Composition',
        backref=db.backref('user', lazy='joined'),
        lazy='dynamic')
    friends = db.relationship(
        "User",
        secondary=friendship,
        primaryjoin=id == friendship.c.friend_a_id,
        secondaryjoin=id == friendship.c.friend_b_id, )
    timezone = db.Column('timezone', db.String(200), nullable=False)

    reminder_time = db.Column('reminder_time', db.Time, nullable=False,
            default=datetime.time(hour=9))

    scheduled_onesignal_notifications = db.relationship(
        'ScheduledOnesignalNotification',
        backref=db.backref('user', lazy='joined'),
        lazy='dynamic')

    def add_friends(self, u):
        self.friends.extend(u)

    def remove_friend(self, u):
        pass

    def append_scheduled_onesignal_notifications(self, onesignal_id):
        noti = ScheduledOnesignalNotification(user_id=self.id,
                onesignal_id=onesignal_id)
        db.session.add(noti)
        db.session.commit()

    def add_friends_from_fb_ids(self, fb_ids):
        friends = db.session.query(User).filter(User.fb_id.in_(fb_ids))
        self.add_friends(friends)

    def update_fb_friends(self, fb_ids):
        import rr.queries as q
        self.friends = q.users_by_fb_ids(fb_ids).all()

    def viewed(self, composition):
        return self in composition.user_views

    def written_by_friend(self, composition):
        return composition.user in self.all_friends

    def __repr__(self):
        return "User(%r)" % self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar_url': self.pic_url,
            'created_at': self.created_at,
            'needs_onboarding': self.compositions.count() == 0
            }


friendship_union = db.select([
    friendship.c.friend_a_id, friendship.c.friend_b_id
]).union(
    db.select([friendship.c.friend_b_id, friendship.c.friend_a_id])).alias()

User.all_friends = db.relationship(
    'User',
    secondary=friendship_union,
    primaryjoin=User.id == friendship_union.c.friend_a_id,
    secondaryjoin=User.id == friendship_union.c.friend_b_id,
    viewonly=True)

views = db.Table('view', db.metadata,
                 db.Column('composition_id', db.Integer,
                           db.ForeignKey('composition.id')),
                 db.Column('user_id', db.Integer, db.ForeignKey('users.id')))


class Composition(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    created_at = db.Column('created_at', db.DateTime,
                           default=datetime.datetime.utcnow())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prompt_id = db.Column(
        db.Integer, db.ForeignKey('prompt.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_views = db.relationship("User", secondary=views, backref="views")

    def to_dict(self):
        return {
            'id': str(self.id),
            'created_at': self.created_at,
            'author': self.user,
            'body': self.body,
            'prompt': self.prompt,
        }


class Prompt(db.Model):
    # TODO: unique date constraint
    id = db.Column('id', db.Integer, primary_key=True)
    date = db.Column('date', db.Date, nullable=False)
    prompt = db.Column('prompt', db.String(1000), nullable=False)
    compositions = db.relationship(
        'Composition',
        backref=db.backref('prompt', lazy='joined'),
        lazy='dynamic')

    def to_dict(self):
        return {
            'date': self.date.isoformat(),
            'prompt': self.prompt,
            'id': str(self.id),
        }

    def __repr__(self):
        return "Prompt(%r %r)" % (str(self.date), self.prompt)

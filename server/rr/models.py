from rr.db import db


friendship = db.Table(
    'friendships', db.metadata,
    db.Column('friend_a_id', db.Integer, db.ForeignKey('user.id'),
              primary_key=True),
    db.Column('friend_b_id', db.Integer, db.ForeignKey('user.id'),
              primary_key=True)
)

class User(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    fb_id = db.Column('facebook_id', db.String, unique=True)
    fb_access_token = db.Column('facebook_access_token', db.String)
    created_at = db.Column('create_date', db.DateTime, default=db.func.now())
    # should these two be nullable?
    name = db.Column('name', db.String)
    pic_url = db.Column('pic_url', db.String)
    compositions = db.relationship('Composition',
        backref=db.backref('user', lazy='joined'), lazy='dynamic')
    friends = db.relationship("User", secondary=friendship,
                           primaryjoin=id==friendship.c.friend_a_id,
                           secondaryjoin=id==friendship.c.friend_b_id,
    )

    def add_friends(self, u):
        self.friends.extend(u)

    def remove_friend(self, u):
        pass

    def add_friends_from_fb_ids(self, fb_ids):
        friends = db.session.query(User).filter(User.fb_id.in_(fb_ids))
        self.add_friends(friends)

    def viewed(self, composition):
        return self in composition.user_views

    def written_by_friend(self, composition):
        return composition.user in self.all_friends

    def __repr__(self):
        return "User(%r)" % self.name


friendship_union = db.select([
    friendship.c.friend_a_id,
    friendship.c.friend_b_id
]).union(
    db.select([
        friendship.c.friend_b_id,
        friendship.c.friend_a_id]
    )
).alias()


User.all_friends = db.relationship('User',
                                   secondary=friendship_union,
                                   primaryjoin=User.id==friendship_union.c.friend_a_id,
                                   secondaryjoin=User.id==friendship_union.c.friend_b_id,
                                   viewonly=True)


views = db.Table('view', db.metadata,
                 db.Column('composition_id', db.Integer, db.ForeignKey('composition.id')),
                 db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
                 )

class Composition(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    created_at = db.Column('create_date', db.DateTime, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompt.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    user_views = db.relationship(
        "User",
        secondary=views,
        backref="views")


class Prompt(db.Model):
    # TODO: unique date constraint
    id = db.Column('id', db.Integer, primary_key=True)
    date = db.Column('date', db.Date, nullable=False)
    prompt = db.Column('prompt', db.String, nullable=False)
    compositions = db.relationship('Composition',
        backref=db.backref('prompt', lazy='joined'), lazy='dynamic')



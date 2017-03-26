import datetime as dt

from tests.fixtures import make_user, make_prompt, make_composition, app, db, session  # noqa


def test_created_at(app, db, session):  # noqa
    u = make_user()
    p1 = make_prompt(date=dt.date.today() - dt.timedelta(days=1))
    p2 = make_prompt(date=dt.date.today())
    c1 = make_composition(user=u, prompt=p1)
    c2 = make_composition(user=u, prompt=p2)
    session.add_all([u, p1, p2, c1, c2])
    session.commit()
    assert type(c1.created_at) is dt.datetime


def make_users(n):
    return (make_user(name='u{}'.format(i), fb_id='fb{}'.format(i))
            for i in range(1, n + 1))


def test_friendships(app, db, session):  # noqa
    u1, u2, u3, u4, u5 = make_users(5)

    u1.friends = [u2, u3]
    u4.friends = [u2, u5]
    u3.friends.append(u5)
    db.session.add_all([u1, u2, u3, u4, u5])
    db.session.commit()

    assert set(u2.all_friends) == set([u1, u4])

    assert set(u5.all_friends) == set([u3, u4])


def test_add_friends_from_fb_ids(app, db, session):  # noqa
    u1, u2, u3, u4, u5 = make_users(5)

    session.add_all([u1, u2, u3, u4, u5])
    session.commit()

    u1.add_friends_from_fb_ids(['fb2', 'fb3', 'fb6'])

    assert set(u1.all_friends) == set([u2, u3])
    assert set(u2.all_friends) == set([u1])


def test_views(session):  # noqa
    u1, u2, u3, u4, u5 = make_users(5)
    p = make_prompt()
    c = make_composition(user=u1, prompt=p)

    session.add_all([u1, u2, u3, u4, u5, p, c])
    session.commit()

    u2.views.append(c)
    u4.views.append(c)

    assert set(c.user_views) == set([u2, u4])
    assert u2.viewed(c) is True
    assert u3.viewed(c) is False


def test_written_by_friend(session):  # noqa
    u1, u2, u3 = make_users(3)
    p = make_prompt()
    c = make_composition(user=u1, prompt=p)

    session.add_all([u1, u2, u3, p, c])
    session.commit()

    u2.all_friends.append(u1)

    assert u2.written_by_friend(c) is True
    assert u3.written_by_friend(c) is False

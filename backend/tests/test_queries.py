from tests.fixtures import app, db, session, make_user, make_prompt, make_composition
from rr.queries import users_who_have_not_written_yet
from datetime import timedelta, datetime


def test_users_who_have_not_written_yet(app, db, session):
    user, user2, prompt = make_user(), make_user(), make_prompt()
    session.add_all([user, user2, prompt])
    session.commit()

    assert set([user, user2]) == set(users_who_have_not_written_yet())

    now = datetime.utcnow()
    two_days_ago = now - timedelta(days=2)
    two_minutes_ago = now - timedelta(minutes=2)
    composition = make_composition(
        user=user, prompt=prompt, created_at=two_days_ago)
    assert set([user, user2]) == set(users_who_have_not_written_yet())

    composition = make_composition(
        user=user, prompt=prompt, created_at=two_minutes_ago)
    assert set([user2]) == set(users_who_have_not_written_yet())

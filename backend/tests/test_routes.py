import flask
from tests.test_fixtures import app, db, session, make_user, make_prompt, make_composition, client


def test_feed_requires_login(client, db, session, mocker):
    res = client.get(flask.url_for('routes.get_feed_route'))
    assert res.status_code == 401

def test_feed_accessible_with_login(client, session):
    u = make_user()
    session.add(u)
    session.commit()

    with client.session_transaction() as sess:
        sess['user_id'] = str(u.id)
    res = client.get(flask.url_for('routes.get_feed_route'))
    assert res.status_code == 200


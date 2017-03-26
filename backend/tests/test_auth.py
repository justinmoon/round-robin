import flask

from pytest_mock import mocker  # noqa
from tests.fixtures import make_user, app, db, session  # noqa

from rr.auth import handle_facebook_login
from rr.models import User
from rr.responses import graph_me_with_friends


class MockResponse:
    status_code = 200

    def __call__(self, *args, **kwargs):
        return self

    def __init__(self, status_code, json_):
        self.status_code = status_code
        self.json = lambda: json_


def no_existing_user(fb_id):
    return None


def existing_user(fb_id):
    return make_user(
        fb_id=graph_me_with_friends['id'],
        fb_access_token='777',  # different than new token ...
    )


def seed_existing_users():
    # no friends yet
    u = make_user(
        fb_id=graph_me_with_friends['id'],
        fb_access_token='999',
        name=graph_me_with_friends['name'],
        pic_url=graph_me_with_friends['picture']['data']['url'], )
    friend_one = make_user(
        fb_id=graph_me_with_friends['friends']['data'][0]['id'])
    friend_two = make_user(
        fb_id=graph_me_with_friends['friends']['data'][1]['id'])
    return u, friend_one, friend_two


#  @pytest.mark.usefixtures('app', 'db', 'session')
#  class TestFoo:
def test_new_user_login(mocker, session):  # noqa
    mocker.patch('rr.queries.user_by_fb_id', side_effect=no_existing_user)

    requests_get_mock = mocker.patch(
        'requests.get',
        side_effect=MockResponse(200, graph_me_with_friends))

    access_token = '123'
    res = handle_facebook_login(access_token)

    url = 'https://graph.facebook.com/me?fields=id,name,picture,'\
          'friends&access_token={}'.format(access_token)
    requests_get_mock.assert_called_with(url)

    u = session.query(User).one()

    # login
    assert flask.session.get('user_id') == str(u.id)

    # request succeeded
    assert res.status_code == 200

    # serialization (FIXME)
    #  assert json.loads(res.data.decode()) == u.to_dict()

def test_existing_user_login(session, mocker):  # noqa
    existing, friend_one, friend_two = seed_existing_users()

    session.add_all([existing, friend_one, friend_two])
    session.commit()

    assert existing.all_friends == []

    mocker.patch('requests.get', MockResponse(200, graph_me_with_friends))
    mocker.patch('rr.queries.user_by_fb_id', no_existing_user)

    access_token = '123'
    handle_facebook_login(access_token)

    # no new users created
    assert session.query(User).count() == 3

    # fb access token updated
    assert existing.fb_access_token == '123'

    # friends updated
    assert set(existing.friends) == set([friend_one, friend_two])

def test_bad_access_token_user_login(app, mocker):  # noqa
    mocker.patch('requests.get',
                 MockResponse(401, {'error': {
                     'message': 'oops'
                 }}))

    access_token = '123'
    res = handle_facebook_login(access_token)

    # tuple returned ...
    assert res[1] == 401

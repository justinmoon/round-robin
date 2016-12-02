import requests
from flask import jsonify, Blueprint
from flask import request

from rr import queries as q
from rr.models import User


auth = Blueprint('auth', __name__)

def test_fb_token(token):
    url = 'https://graph.facebook.com/me?fields=id,name,picture,friends&access_token={}'.format(token)
    res = requests.get(url)
    print(res.status_code)

    # if token works, log them in
    if res.status_code == 200:
        # check if user already exists
        u = q.user_by_fb_id(res['id'])
        if not u:
            # grab id's at append
            u = q.make_user(
                fb_id=res['id'],
                fb_access_token=token,
                name=res['name'],
                pic_url=res['picture']['data']['url'],
                fb_friend_ids=[f['id'] for f in res['friends']['data']],
            )
        # TODO: log user in

        # TODO: publish some kind of signal

        

        return '', 200
    else:
        return 'bad', 401


@auth.route('/login', methods=['POST'])
def login():
    fb_access_token = request.json['access_token']
    test_fb_token(fb_access_token)
    return 'login'


@auth.route('/fb-oauth')
def fb_oauth():
    print('fb-oauth')
    return 'fb-oauth'


@auth.route('/logout')
def logout():
    return 'logout'

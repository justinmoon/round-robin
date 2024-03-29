import requests
from flask import jsonify, Blueprint, request
from flask_login import (
    login_user, LoginManager, login_required, current_user, logout_user
)

from rr.queries import user_by_fb_id
from rr.models import User
from rr.db import db
import rr.events as events

auth = Blueprint('auth', __name__)

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)


@auth.route('/login', methods=['POST'])
def login():
    token = request.json['access_token']
    url = ('https://graph.facebook.com/me?fields=id,name,picture,'
          'friends&access_token={}').format(token)
    res = requests.get(url)
    print(res.status_code)

    data = res.json()

    # if token works, log them in
    if res.status_code == 200:

        # check if user already exists
        u = user_by_fb_id(data['id'])
        if not u:
            timezone = request.json['timezone']
            u = User(
                fb_id=data['id'],
                fb_access_token=token,
                timezone=timezone,
                name=data['name'],
                pic_url=data['picture']['data']['url'], )

        fb_ids = [f['id'] for f in data['friends']['data']]
        u.update_fb_friends(fb_ids)
        u.fb_access_token = token

        db.session.add(u)
        db.session.commit()

        login_user(u, remember=True)
        events.on_new_user(u)

        return jsonify(u)
    else:
        return jsonify({'error': data['error']['message']}), 401


@auth.route('/current-user')
@login_required
def session_():
    return jsonify(current_user)


@auth.route('/current-user-json')
def session_json():
    if current_user.is_authenticated:
        return jsonify(current_user)
    return jsonify({})


@auth.route('/logout', methods=['post'])
def logout():
    logout_user()
    return jsonify({})

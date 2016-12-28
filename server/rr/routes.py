from flask import jsonify, Blueprint, request
from flask_login import login_required, current_user

import rr.queries as q

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return jsonify({'key':'the truth!'})

@routes.route('/seed')
def seed():
    # TODO: flask-script couldn't successfully run this, so put it here
    # This is dangerous ...
    from rr.db import db
    import rr.seed
    db.drop_all()
    db.create_all()

    rr.seed.create_users()
    rr.seed.create_prompts()
    rr.seed.create_compositions()
    return 'done'

# @routes.route('/reset')
# def reset():
#     from rr.db import db
#     db.drop_all()
#     db.create_all()
#     return '', 204


@routes.route('/prompts')
def prompt():
    prompts = q.get_prompts()
    return jsonify({
        prompt.date.isoformat(): prompt for prompt in prompts.all()
    })


@routes.route('/compositions', methods=['POST'])
@login_required
def create_composition_route():
    payload = request.json
    c = q.create_composition(
        prompt_id=payload['prompt_id'],
        user_id=current_user.id,
        body=payload['body'],
    )
    return jsonify(c)


@routes.route('/feed')
@login_required
def get_feed_route():
    feed = q.construct_feed()
    return jsonify(feed.all())


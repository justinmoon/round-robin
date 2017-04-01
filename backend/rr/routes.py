import iso8601
from datetime import datetime

from flask import jsonify, Blueprint, request
from flask_login import login_required, current_user

from rr.db import db
import rr.queries as q
import rr.jobs as jobs
import rr.events as e

routes = Blueprint('routes', __name__)


@routes.route('/prompts')
def prompt():
    prompts = q.get_prompts()
    return jsonify(
        {prompt.date.isoformat(): prompt
         for prompt in prompts.all()})


@routes.route('/compositions', methods=['POST'])
@login_required
def create_composition_route():
    payload = request.json
    composition = q.create_composition(
        prompt_id=payload['prompt_id'],
        user_id=current_user.id,
        body=payload['body'], )
    e.on_new_composition(q.get_user(current_user), composition)
    return jsonify(composition)


@routes.route('/feed')
@routes.route('/compositions/friends')
@login_required
def get_feed_route():
    feed = q.construct_feed(current_user)
    return jsonify(feed.all())


@routes.route('/compositions/me')
@login_required
def get_current_user_compositions():
    feed = q.current_user_compositions(current_user)
    return jsonify(feed.all())


@routes.route('/cron/hourly')
def handle_hourly_cron():
    e.on_hourly_cron()
    return 'ok', 200


@routes.route('/update-user', methods=['POST'])
@login_required
def update_user():
    timezone = request.json.get('timezone')
    reminder_time = request.json.get('reminder_time')

    if timezone:
        current_user.timezone = timezone
    if reminder_time:
        reminder_time = datetime.strptime(reminder_time, '%H:%M:%S').time()
        current_user.reminder_time = reminder_time
        e.on_writing_schedule_update(q.get_user(current_user))

    db.session.commit()
    return jsonify(current_user)

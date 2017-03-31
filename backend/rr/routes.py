from flask import jsonify, Blueprint, request
from flask_login import login_required, current_user

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
    e.on_new_composition(current_user, composition)
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


@routes.route('/cron/midnight')
def handle_midnight_cron():
    for user in q.all_users():
        # Delete records of yesterday's scheduled notifications
        q.purge_scheduled_notifcations(user)
        # Schedule today's notifications
        jobs.schedule_onesignal_reminders.queue(user)
    return 'ok', 200


@routes.route('/observe-device')
def observe_device():
    data = request.get_json()
    return ''

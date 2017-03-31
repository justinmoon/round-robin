import logging
from flask import current_app
from flask_rq2 import RQ
from rr.db import db
import rr.onesignal
from rr.queries import get_midnight_users, all_users


rq = RQ()


@rq.job
def schedule_onesignal_reminders(user):
    from rr.app import app
    with app.app_context():
        rr.onesignal.schedule_daily_reminders_for_user(user)


@rq.job
def cancel_onesignal_reminders(user):
    from rr.app import app
    with app.app_context():
        for noti in user.scheduled_onesignal_notifications:
            rr.onesignal.one_signal_client().delete_notification(noti.onesignal_id)
            db.session.delete(noti)
            db.session.commit()


@rq.job
def hourly_cron():
    from rr.app import app
    with app.app_context():
        for user in get_midnight_users():
            try:
                rr.onesignal.schedule_daily_reminders_for_user(user)
            except:
                logging.error('Failed to schedule notifications for user {}'.format(user))

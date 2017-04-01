import logging
from flask import current_app
from flask_rq2 import RQ
from rr.db import db
import rr.onesignal
from rr.queries import get_midnight_users, all_users, get_user_by_id


rq = RQ()


@rq.job
def schedule_onesignal_reminders(user):
    from rr.app import app
    with app.app_context():
        rr.onesignal.schedule_daily_reminders_for_user(user)


@rq.job
def cancel_onesignal_reminders(user_id):
    from rr.app import app
    user = get_user_by_id(user_id)
    count = user.scheduled_onesignal_notifications.count()
    logging.info('Cancelling {} Onesignal Reminds for user {}'.format(count, user))
    with app.app_context():
        for noti in user.scheduled_onesignal_notifications.all():
            try:
                res = rr.onesignal.one_signal_client().delete_notification(noti.onesignal_id)
                db.session.delete(noti)
                db.session.commit()
                if res.status_code != 200:
                    logging.error('Encountered non-200 status code cancelling onesignal notification:')
                    logging.error(res.json()['errors'])
            except Exception as e:
                logging.error('Encountered exception cancelling Onesignal notification: ')
                logging.error(e, exc_info=True)

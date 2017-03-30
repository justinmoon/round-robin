import rr.onesignal
from rr.queries import users_who_have_not_written_yet, all_users


def schedule_onesignal_reminders():
    for user in all_users():
        rr.onesignal.schedule_daily_reminders_for_user(user)

def cancel_onesignal_reminders(user):
    for noti in user.scheduled_onesignal_notifications:
        res = rr.onesignal.one_signal_client().delete_notification(noti.onesignal_id)
        db.session.delete(noti)
        db.session.commit()



if __name__ == '__main__':
    from rr.app import app
    with app.app_context():
        # on new composition

        #  cli_arg = sys.argv[-1]
        #  id_ = int(cli_arg)
        #  user = db.session.query(User).get(id_)
        #  composition = user.compositions[0]
        #  on_new_composition(user, composition)

        #  from rr.db import db
        #  from rr.models import User
        #  user = db.session.query(User).first()
        #  schedule_onesignal_reminders()
        #  cancel_onesignal_reminders(user)


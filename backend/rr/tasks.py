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



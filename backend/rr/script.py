
if __name__ == '__main__':
    from rr.app import app
    from rr.models import User
    from rr.jobs import *
    with app.app_context():
        user = db.session.query(User).first()
        cancel_onesignal_reminders.queue(user)
        schedule_onesignal_reminders.queue(user)

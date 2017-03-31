from datetime import timedelta, datetime
import rr.onesignal
import rr.jobs as jobs
from rr.queries import get_midnight_users


def on_new_composition(user, composition):
    # Notify friends
    users = user.friends
    contents = '{name} just wrote about "{prompt}"'.format(
        name=user.name, prompt=composition.prompt.prompt)
    data = {'event': 'new-composition', 'compositionId': composition.id}
    rr.onesignal.send_to_users(users, contents, data=data)

    # Delete pending reminders that day
    jobs.cancel_onesignal_reminders.queue(user)


def on_new_user(user):
    # Schedule reminders (delay is to allow client time to register user id)
    jobs.schedule_onesignal_reminders.schedule(timedelta(seconds=5), user)


def on_midnight_cron():
    for user in get_midnight_users():
        # Reschedule all onesignal reminders
        jobs.cancel_onesignal_reminders.queue(user)
        jobs.schedule_onesignal_reminders.queue(user)


def on_writing_schedule_update(user):
    # Reschedule all onesignal reminders
    jobs.cancel_onesignal_reminders.queue(user)
    jobs.schedule_onesignal_reminders.queue(user)

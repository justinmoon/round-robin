from flask import current_app
from onesignalsdk import one_signal_sdk


def one_signal_client():
    return one_signal_sdk.OneSignalSdk(
        current_app.config.get('ONESIGNAL_API_KEY'),
        current_app.config.get('ONESIGNAL_APP_ID'), )


OR = {"operator": "OR"}


def construct_filter(user):
    user_id = user.id
    return {"field": "tag", "key": "id", "relation": "=", "value": user_id}


def construct_filters(users):
    filters = []
    if len(users) != 0:
        filters.append(construct_filter(users[0]))
        for user in users[1:]:
            filters.append(OR)
            filters.append(construct_filter(user))
    return filters


def schedule_daily_reminders_for_user(user):
    contents = 'It\'s time to write!'
    heading = ''
    data = {'event': 'reminder-to-write'}
    filters = [construct_filter(user)]
    res = one_signal_client().create_notification(
        contents=contents,
        heading=heading,
        included_segments=[],
        data=data,
        filters=filters,
        delayed_option='timezone',
        delivery_time_of_day=user.reminder_time.isoformat(),
    )
    onesignal_id = res.json()['id']
    if len(onesignal_id) > 0:
        user.append_scheduled_onesignal_notifications(onesignal_id)


def send_to_users(users, contents, heading='', data={}, onesignal_args={}):
    filters = construct_filters(users)
    return one_signal_client().create_notification(
        contents=contents,
        heading=heading,
        included_segments=[],
        filters=filters,
        data=data, 
        **onesignal_args,
   )

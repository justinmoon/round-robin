from flask import current_app
from onesignalsdk import one_signal_sdk

def one_signal_client():
    return one_signal_sdk.OneSignalSdk(
        current_app.config.get('ONESIGNAL_API_KEY'),
        current_app.config.get('ONESIGNAL_APP_ID'),
    )

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


def send_to_users(users, contents, heading='', data={}):
    filters = construct_filters(users)
    return one_signal_client().create_notification(
        contents=contents,
        heading=heading,
        included_segments=[],
        filters=filters,
        data=data,
    )

import rr.onesignal
from rr.queries import users_who_have_not_written_yet, all_users


def on_new_composition(user, composition):
    users = user.friends
    contents = '{name} just wrote about "{prompt}"'.format(
        name=user.name, prompt=composition.prompt.prompt)
    data = {'event': 'new-composition', 'compositionId': composition.id}
    rr.onesignal.send_to_users(users, contents, data=data)

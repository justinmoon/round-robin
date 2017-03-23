import rr.onesignal


def on_new_composition(user, composition):
    users = user.friends
    contents = '{name} just wrote about "{prompt}"'.format(
        name=user.name, prompt=composition.prompt.prompt)
    data = {'event': 'new-composition', 'compositionId': composition.id}
    rr.onesignal.send_to_users(users, contents, data=data)


def on_hourly_cron():
    users = [db.session.query(User).get(1)]
    contents = 'It\'s time to write!'
    data = {'event': 'reminder-to-write'}
    rr.onesignal.send_to_users(users, contents, data=data)


if __name__ == '__main__':
    import sys
    from rr.app import app
    from rr.models import db, User
    with app.app_context():
        ### on new composition 
        #  cli_arg = sys.argv[-1]
        #  id_ = int(cli_arg)
        #  user = db.session.query(User).get(id_)
        #  composition = user.compositions[0]
        #  on_new_composition(user, composition)

        ### on_hourly_cron
        on_hourly_cron()

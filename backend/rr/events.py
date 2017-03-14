import rr.onesignal


def on_new_composition(user, composition):
    users = user.friends
    contents = '{name} just wrote about "{prompt}"'.format(
        name=user.name, prompt=composition.prompt.prompt
    )
    data = {'event': 'new-composition', 'compositionId': composition.id}
    res = rr.onesignal.send_to_users(users, contents, data=data)
    print(res.json())


if __name__ == '__main__':
    from rr.app import app
    from rr.models import db, User
    with app.app_context():
        user = db.session.query(User).get(3)
        composition = user.compositions[0]
        on_new_composition(user, composition)

import rr.onesignal


def on_new_composition(user, composition):
    users = user.friends
    contents = '{name} just wrote about "{prompt}"'.format(
        name=user.name, prompt=composition.prompt.prompt
    )
    res = rr.onesignal.send_to_users(users, contents)
    print(res.json())

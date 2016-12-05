from datetime import datetime, timedelta
import random

import rr.queries as q
import rr.models as m
from rr.db import db


def read_psalms():
    with open('psalms', 'r') as f:
        psalms_string = f.read()
        psalms = psalms_string.split('\n\n\n\n')
        return psalms


def create_users():
    claire = q.create_user(
        name='Claire Richardson',
        pic_url='https://fb-s-c-a.akamaihd.net/h-ak-xat1/v/t1.0-1/p320x320/11666076_10152860791826787_2281368783831143452_n.jpg?oh=ebadeca895ae75a01fd1d93606309366&oe=58F3BF4D&__gda__=1488797585_edf109bbd1f9715f0c760081b71f78b1',
        fb_access_token='claire',
        fb_id='claire',
    )
    sam = q.create_user(
        name='Sam Kozloff',
        pic_url='https://fb-s-d-a.akamaihd.net/h-ak-xpa1/v/t1.0-1/c0.10.320.320/p320x320/1011706_10200499449670216_1138743800_n.jpg?oh=acba582368cd0eeb2ed87ff4413c14dc&oe=58B837F1&__gda__=1492541236_b53d275fac5d192b1dcafbf8e882fe1e',
        fb_access_token='sam',
        fb_id='sam',
    )
    ben = q.create_user(
        name='Ben Gulla',
        pic_url='https://fb-s-c-a.akamaihd.net/h-ak-xta1/v/t1.0-1/c21.21.268.268/190380_1696803461385_1406884_n.jpg?oh=dc4908e59d9772a37f18a4d908a8b9db&oe=58FB1F53&__gda__=1489040026_d1fe333fd5351d9a7240d9b27c09bb65',
        fb_access_token='ben',
        fb_id='ben',
    )
    thuy = q.create_user(
        name='Nhi Thuy',
        pic_url='https://fb-s-a-a.akamaihd.net/h-ak-xat1/v/t1.0-1/p320x320/15109589_1233522253380691_4726623713771430335_n.jpg?oh=fa043709409033acce0efbb59be4ab97&oe=58C07CDF&__gda__=1487981939_0b5d379f4462df48a0da94f44c78a510',
        fb_access_token='thuy',
        fb_id='thuy',
    )
    jimmy = q.create_user(
        name='Kyle James Meltzer',
        pic_url='https://fb-s-c-a.akamaihd.net/h-ak-xtf1/v/t1.0-1/p320x320/14034954_10153838092398683_9193616731150996134_n.jpg?oh=939c5d482d3a4b59e8f2cd69cbad5b54&oe=58B376BB&__gda__=1488316830_00a785fff55e3fa5f176e1491a42bdfd',
        fb_access_token='jimmy',
        fb_id='jimmy',
    )
    justin = q.create_user(
        name='Justin Moen',
        pic_url='https://fb-s-a-a.akamaihd.net/h-ak-xtf1/v/t1.0-1/p320x320/14915696_10207411476473760_4184340587655415773_n.jpg?oh=81cbc250213c861b71dd0d85b67cc804&oe=58B76472&__gda__=1488169047_9509afbd8197720c3c95d996910c4d65',
        fb_access_token='justin',
        fb_id='justin',
    )

    claire.friends = [sam, justin, ben]
    sam.friends = [claire, ben, justin]
    ben.friends = [claire, sam, justin]
    thuy.friends = [justin]
    jimmy.frieds = [justin, sam]
    justin.friends = [claire, sam, ben, thuy, jimmy]

    db.session.add_all([claire, sam, ben, thuy, jimmy, justin])
    db.session.commit()

    return (claire, sam, ben, thuy, jimmy, justin)


def create_prompts():
    now = datetime.now()
    yesterday = now - timedelta(days=1)
    tomorrow = now + timedelta(days=1)

    today_prompt = q.create_prompt(date=yesterday.date(), prompt='Beer')
    yesterday_prompt = q.create_prompt(date=now.date(), prompt='Fear')
    tomorrow_prompt = q.create_prompt(date=tomorrow.date(), prompt='Meer')

    return (today_prompt, yesterday_prompt, tomorrow_prompt)


def create_compositions():
    now = datetime.now()

    psalms = read_psalms()
    users = db.session.query(m.User).all()
    _, today_prompt, yesterday_prompt = db.session.query(m.Prompt).order_by(m.Prompt.date.desc()).all()

    for i in range(len(psalms)):
        created_at = now - timedelta(seconds=random.randint(0, 24*60*60))
        q.create_composition(
            user_id=users[random.randint(0, len(users) - 1)].id,
            created_at=created_at,
            prompt_id=today_prompt.id if created_at.date() == now.date() else yesterday_prompt.id,
            body=psalms[i],
        )

from tests.test_fixtures import app, db, session, make_user, make_prompt, make_composition
import json
from flask import jsonify
from datetime import datetime, time, date


def test_custom_json_serializer(session, app):
    u, p = make_user(), make_prompt()
    c = make_composition(user=u, prompt=p)
    session.add_all([u, p, c])
    session.commit()
    
    now = datetime.now()
    input = {
        'now': now,
        'user': u,
        'prompt': p,
        'composition': c,
    }
    expected = {
        'now': now.isoformat(),
        'user': u.to_dict(),
        'prompt': p.to_dict(),
        'composition': c.to_dict(),
    }
    res = jsonify(input)
    output = json.loads(res.data.decode())
    assert expected == output

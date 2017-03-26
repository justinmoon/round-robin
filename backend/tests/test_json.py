from tests.fixtures import app, db, session, make_user, make_prompt, make_composition  # noqa
import json
from flask import jsonify


def test_custom_json_serializer(session, app):  # noqa
    user, prompt = make_user(), make_prompt()
    composition = make_composition(user=user, prompt=prompt)
    session.add_all([user, prompt, composition])
    session.commit()
    jsonified = jsonify(composition)
    output = json.loads(jsonified.data.decode())
    assert output['created_at'] == composition.created_at.isoformat()
    #  assert output['author'] == composition.user.to_dict()  # FIXME

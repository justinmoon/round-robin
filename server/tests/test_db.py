import re
import datetime as dt
from rr.models import Composition

from tests.test_fixtures import app, db, session
from tests import constants

def test_created_at(session):
    c = Composition()
    c2 = Composition()
    session.add_all([c,c2])
    session.commit()
    assert type(c.created_at) is dt.datetime

#
# def test_guid(session):
#     c = Composition()
#     session.add(c)
#     session.commit()
#     print(c.id)
#     assert re.match(constants.UUID_REGEX, c.id) is not None




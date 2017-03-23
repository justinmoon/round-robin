import pytest
import datetime as dt
import uuid
from flask import request

from rr.factory import create_app
from rr.db import db as _db
from rr.models import User, Composition, Prompt

# FIXME: scope='session'


@pytest.fixture(scope='function')
def db(app, request):
    """Session-wide test database."""

    def teardown():
        _db.drop_all()

    _db.app = app
    _db.create_all()

    request.addfinalizer(teardown)
    return _db


@pytest.fixture(scope='function')
def session(db, request):
    """Creates a new database session for a test."""
    connection = db.engine.connect()
    transaction = connection.begin()

    options = dict(bind=connection)
    session = db.create_scoped_session(options=options)

    db.session = session

    def teardown():
        transaction.rollback()
        connection.close()
        session.remove()

    request.addfinalizer(teardown)
    return session


@pytest.yield_fixture(scope='function')
def app():
    """An application for the tests."""
    test_config = {}
    _app = create_app('test', test_config)
    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()


@pytest.fixture
def client(app):
    return app.test_client()


def make_prompt(date=dt.date.today(), prompt='freighter'):
    return Prompt(date=date, prompt=prompt)


def make_user(name='susan',
              pic_url='http://google.com',
              fb_access_token=None,
              fb_id=None):
    if fb_access_token is None:
        fb_access_token = str(uuid.uuid4())
    if fb_id is None:
        fb_id = str(uuid.uuid4())
    return User(
        name=name,
        pic_url=pic_url,
        fb_id=fb_id,
        fb_access_token=fb_access_token)


def make_composition(*, user, prompt, body='I went hunting', created_at=None):
    #  if created_at is None:
    #  created_at = datetime.now()
    return Composition(
        user=user, prompt=prompt, body=body, created_at=created_at)

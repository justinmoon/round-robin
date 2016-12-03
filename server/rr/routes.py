from flask import jsonify, Blueprint
from flask_login import login_required

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return jsonify({'key':'value'})


@routes.route('/feed')
@login_required
def feed():
    return jsonify([])


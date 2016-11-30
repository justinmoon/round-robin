from flask import jsonify, Blueprint

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return jsonify({'key':'value'})

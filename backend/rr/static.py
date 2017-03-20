from flask import Blueprint, render_template

static = Blueprint('serve', __name__, template_folder='build')
#  static = Blueprint('serve', __name__, template_folder='../../web/build')

@static.route('/')
def index():
    return render_template('index.html')

@static.route('/<path:path>')
def fallback(path):
    return render_template('index.html')

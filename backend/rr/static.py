from flask import Blueprint, render_template, render_template_string

static = Blueprint('serve', __name__, template_folder='build')


@static.route('/')
def index():
    return render_template('index.html')


@static.route('/demos')
def demos():
    return render_template_string("""
    <h3>Up-to-date demos available at the following locations</h3>
    <ul>
        <li><a href='http://roundrob.in/login'>Web</a></li>
        <li><a href='https://play.google.com/store/apps/details?id=com.roundrobin&hl=en'>Android</a></li>
        <li>Invitation to iOS app available by emailing <a href='mailto:jamoen7@gmail.com'>jamoen7@gmail.com</a>. FYI it's nearly the same as Android version.</li>
    </ul>""")


@static.route('/<path:path>')
def fallback(path):
    return render_template('index.html')

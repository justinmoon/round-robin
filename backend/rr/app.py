from rr.factory import create_app

app = create_app(__name__)

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')

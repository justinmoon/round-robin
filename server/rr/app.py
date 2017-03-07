from rr.factory import create_app

app = create_app(__name__)

if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0')
    #  app.run(host='127.0.0.1', port=8080, debug=True)



#!/usr/bin/env python3
from gevent import monkey
from psycogreen.gevent import patch_psycopg

monkey.patch_all()
patch_psycopg()
from ideahunt.app import create_app

app = create_app()

if __name__ == "__main__":
    import werkzeug
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    @werkzeug.serving.run_with_reloader
    def runServer():
        app.debug = True
        server = pywsgi.WSGIServer(("", 5000), app, handler_class=WebSocketHandler, log=app.logger)
        server.serve_forever()

    runServer()

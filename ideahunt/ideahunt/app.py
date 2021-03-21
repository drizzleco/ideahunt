import os

from flask import Flask, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended.view_decorators import jwt_optional
from flask_migrate import Migrate
from flask_sockets import Sockets

from ideahunt.auth import *
from ideahunt.graphql.graphqlview import IdeahuntGraphQLView
from ideahunt.graphql.schema import schema
from ideahunt.graphql.subscription_server import IdeahuntSubscriptionServer
from ideahunt.graphql.template import render_graphiql
from ideahunt.models import db


def create_app():
    app = Flask(__name__)
    # TODO: Update this to real security creds later
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "postgresql://admin:password@postgres:5432/ideahunt",  # dev server
    )
    app.config["SECRET_KEY"] = "dummy"
    app.config["JWT_SECRET_KEY"] = "dummyo"

    # TODO: Remove CORS for *. Only let the client in
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    db.init_app(app)
    JWTManager(app)
    Migrate(app, db)
    sockets = Sockets(app)

    subscription_server = IdeahuntSubscriptionServer(schema)
    app.app_protocol = lambda environ_path_info: "graphql-ws"

    def echo_socket(ws):
        subscription_server.handle(ws)
        return []

    sockets.route("/subscriptions")(echo_socket)
    # GraphQl route config
    def graphql_view():
        view = IdeahuntGraphQLView.as_view("graphql", schema=schema, graphiql=True)
        return jwt_optional(view)

    def graphiql_view():
        return make_response(render_graphiql())

    app.add_url_rule("/graphql", methods=["GET", "POST", "PUT", "DELETE"], view_func=graphql_view())
    app.route("/graphiql")(graphiql_view)
    app.add_url_rule("/register", methods=["POST"], view_func=register)
    app.add_url_rule("/login", methods=["POST"], view_func=login)

    return app

import os

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from flask_jwt_extended import JWTManager, jwt_required
from flask_migrate import Migrate
from flask_sockets import Sockets
from graphql_ws.gevent import GeventSubscriptionServer

from ideahunt.auth import *
from ideahunt.graphql.graphqlview import IdeahuntGraphQLView
from ideahunt.graphql.schema import schema
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
    Sockets(app)

    # GraphQl route config
    def graphql_view():
        view = IdeahuntGraphQLView.as_view(
            "graphql",
            schema=schema,
            graphiql=True,
        )
        return jwt_required(view)

    app.add_url_rule("/graphql", methods=["POST", "GET"], view_func=graphql_view())
    app.add_url_rule("/register", methods=["POST"], view_func=register)
    app.add_url_rule("/login", methods=["POST"], view_func=login)


    subscription_server = GeventSubscriptionServer(schema)
    app.app_protocol = lambda environ_path_info: 'graphql-ws'

    return app

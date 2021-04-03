from flask import Flask, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended.view_decorators import jwt_optional
from flask_migrate import Migrate
from flask_sockets import Sockets

from ideahunt.config import Config
from ideahunt.graphql.graphqlview import IdeahuntGraphQLView
from ideahunt.graphql.schema import schema
from ideahunt.graphql.subscription_server import IdeahuntSubscriptionServer
from ideahunt.graphql.template import render_graphiql
from ideahunt.models import db
from ideahunt.redis import IdeaHuntRedis

redis_base = IdeaHuntRedis()


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    # TODO: Remove CORS for *. Only let the client in
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    db.init_app(app)
    JWTManager(app)
    Migrate(app, db)
    redis_base.init_app(app)
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

    return app

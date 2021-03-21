from flask_jwt_extended.utils import decode_token
from graphql_ws.gevent import GeventSubscriptionServer

from ideahunt.helpers import get_viewer


class IdeahuntSubscriptionServer(GeventSubscriptionServer):
    def on_connect(self, connection_context, payload):
        """ Hack: manually handle jwt """
        jwt_config = decode_token(payload["token"])
        username = jwt_config["identity"]
        viewer = get_viewer(applied_username=username)
        connection_context.request_context = {"viewer": viewer}

    def execute(self, request_context, params):
        """ Passes in the context_value for context to use in resolvers"""
        params["context_value"] = request_context
        return super(GeventSubscriptionServer, self).execute(request_context, params)

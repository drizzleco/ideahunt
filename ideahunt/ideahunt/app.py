import os

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from flask_jwt_extended import JWTManager, jwt_required
from ideahunt.auth import *
from ideahunt.graphql.schema import schema
from ideahunt.models import User, db

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

# GraphQl route config
def graphql_view():
    view = GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    )
    return jwt_required(view)


app.add_url_rule("/graphql", methods=["POST", "GET"], view_func=graphql_view())
app.add_url_rule("/register", methods=["POST"], view_func=register)
app.add_url_rule("/login", methods=["POST"], view_func=login)


@app.route("/")
def hello():
    return "Working!"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", debug=True)

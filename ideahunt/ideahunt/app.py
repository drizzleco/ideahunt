import os, random

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from flask_login import LoginManager, current_user, login_required

from ideahunt.auth import *
from ideahunt.graphql.schema import schema
from ideahunt.models import Base, User, db

app = Flask(__name__)
# TODO: Update this to real security creds later
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    "postgresql://admin:password@postgres:5432/ideahunt",  # dev server
)
app.config["SECRET_KEY"] = "dummy"

# TODO: Remove CORS for *. Only let the client in
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()


# GraphQl route config
def graphql_view():
    view = GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    )
    return login_required(view)


app.add_url_rule("/graphql", methods=["POST", "GET"], view_func=graphql_view())
app.add_url_rule("/register", methods=["POST"], view_func=register)
app.add_url_rule("/login", methods=["POST"], view_func=login)
app.add_url_rule("/logout", methods=["DELETE"], view_func=logout)


@app.route("/")
def hello():
    return "Working!"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", debug=True)

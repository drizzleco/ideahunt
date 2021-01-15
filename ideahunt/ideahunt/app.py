import os

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from ideahunt.graphql.schema import schema
from ideahunt.models import Base, db

app = Flask(__name__)
# TODO: Update this to real security creds later
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    "postgresql://admin:password@postgres:5432/ideahunt",  # dev server
)
# TODO: Remove CORS for *. Only let the client in
CORS(app, resources={r"/graphql": {"origins": "*"}})
db.init_app(app)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    ),
)


@app.route("/")
def hello():
    return "Working!"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", debug=True)

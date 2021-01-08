from flask import Flask
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy

from ideahunt.models import Base
from ideahunt.schema import schema

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
# TODO: Update this to real security creds later
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://admin:password@postgres:5432/ideahunt"
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

import graphene
from flask_jwt_extended.utils import create_access_token

from ideahunt.models import User, db


class LogIn(graphene.Mutation):
    access_token = graphene.String()
    error = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(root, info, **kwargs):
        user = User.query.filter_by(username=kwargs["username"]).first()
        if not user or not user.check_password(kwargs["password"]):
            return LogIn(error="Invalid Password")
        access_token = create_access_token(identity=kwargs["username"], expires_delta=False)
        return LogIn(access_token=access_token)


class Register(graphene.Mutation):
    access_token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        confirm = graphene.String(required=True)

    def mutate(root, info, **kwargs):
        user = User.query.filter_by(username=kwargs["username"]).first()
        if user:
            raise Exception("User already exists")
        user = User.query.filter_by(email=kwargs["email"]).first()
        if user:
            raise Exception("Email already exists")

        user = User(username=kwargs["username"], name=kwargs["name"], email=kwargs["email"])
        user.set_password(kwargs["password"])

        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=kwargs["username"], expires_delta=False)
        return Register(access_token=access_token)

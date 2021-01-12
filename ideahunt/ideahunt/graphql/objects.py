from graphene_sqlalchemy import SQLAlchemyObjectType

from ideahunt.models import Idea, User


class UserModel(SQLAlchemyObjectType):
    """
    User Model
    """

    class Meta:
        model = User


class IdeaModel(SQLAlchemyObjectType):
    """
    Idea Model
    """

    class Meta:
        model = Idea

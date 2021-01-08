import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from ideahunt.models import Idea as IdeaModel
from ideahunt.models import User as UserModel


class User(SQLAlchemyObjectType):
    """
    User Model
    """

    class Meta:
        model = UserModel


class Idea(SQLAlchemyObjectType):
    """
    Idea Model
    """

    class Meta:
        model = IdeaModel


class Query(graphene.ObjectType):
    """
    Base Query
    """

    idea = graphene.Field(Idea, id=graphene.Int())

    def resolve_idea(self, info, **args):
        """
        Parse idea query and return data
        """
        return Idea.get_query(info).filter_by(id=args.get("id")).first()


schema = graphene.Schema(query=Query)

import graphene
from graphene import ResolveInfo
from graphene_sqlalchemy import SQLAlchemyObjectType

from ideahunt.models import Comment, Idea, Like, User


class UserModel(SQLAlchemyObjectType):
    class Meta:
        model = User


class IdeaModel(SQLAlchemyObjectType):
    class Meta:
        model = Idea

    like_count = graphene.Int()

    def resolve_like_count(parent: Idea, info: ResolveInfo) -> int:
        return Like.query.filter(Like.idea_id == parent.id).count()


class CommentModel(SQLAlchemyObjectType):
    class Meta:
        model = Comment


class LikeModel(SQLAlchemyObjectType):
    class Meta:
        model = Like

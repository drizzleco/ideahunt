from typing import Optional

import graphene
from graphene import ResolveInfo
from graphene_sqlalchemy import SQLAlchemyObjectType

from ideahunt.helpers import get_viewer
from ideahunt.models import Comment, Idea, Like, User


class UserModel(SQLAlchemyObjectType):
    class Meta:
        model = User


class IdeaModel(SQLAlchemyObjectType):
    class Meta:
        model = Idea

    like_count = graphene.Int()
    viewer_like = graphene.Field(lambda: LikeModel)

    def resolve_viewer_like(parent: Idea, info: ResolveInfo) -> Optional[Like]:
        viewer = get_viewer()
        return Like.query.filter(
            Like.idea_id == parent.id,
            Like.author_id == viewer.id,
        ).first()

    def resolve_like_count(parent: Idea, info: ResolveInfo) -> int:
        return Like.query.filter(Like.idea_id == parent.id).count()


class CommentModel(SQLAlchemyObjectType):
    class Meta:
        model = Comment

    like_count = graphene.Int()
    viewer_like = graphene.Field(lambda: LikeModel)

    def resolve_viewer_like(parent: Comment, info: ResolveInfo) -> Optional[Like]:
        viewer = get_viewer()
        return Like.query.filter(
            Like.comment_id == parent.id,
            Like.author_id == viewer.id,
        ).first()

    def resolve_like_count(parent: Comment, info: ResolveInfo) -> int:
        return Like.query.filter(Like.comment_id == parent.id).count()


class LikeModel(SQLAlchemyObjectType):
    class Meta:
        model = Like

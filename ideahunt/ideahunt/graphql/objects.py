from typing import Optional

import graphene
from graphene import ResolveInfo
from graphene_sqlalchemy import SQLAlchemyObjectType
from sqlalchemy import func

from ideahunt.helpers import get_viewer
from ideahunt.models import Comment, Follow, Idea, Like, User


class UserModel(SQLAlchemyObjectType):
    class Meta:
        model = User

    follower_count = graphene.Int()
    following_count = graphene.Int()
    follows_user = graphene.Field(graphene.Boolean, user_id=graphene.ID(required=True))

    def resolve_following_count(parent: User, info: ResolveInfo) -> int:
        return (
            Follow.query.filter(Follow.user_id == parent.id)
            .with_entities(func.count(Follow.user_id))
            .scalar()
        )

    def resolve_follower_count(parent: User, info: ResolveInfo) -> int:
        return (
            Follow.query.filter(Follow.followee_id == parent.id)
            .with_entities(func.count(Follow.followee_id))
            .scalar()
        )

    def resolve_follows_user(parent: User, info: ResolveInfo, user_id: graphene.ID) -> bool:
        return (
            Follow.query.filter(Follow.followee_id == user_id)
            .filter(Follow.user_id == parent.id)
            .first()
            is not None
        )


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


class FollowModel(SQLAlchemyObjectType):
    class Meta:
        model = Follow

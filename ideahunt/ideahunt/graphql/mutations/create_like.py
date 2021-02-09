import graphene
from sqlalchemy import and_, or_

from ideahunt.graphql.objects import LikeModel
from ideahunt.helpers import get_viewer
from ideahunt.models import Comment, Like, db


class CreateLike(graphene.Mutation):
    comment = graphene.Field(lambda: LikeModel)

    class Arguments:
        comment_id = graphene.ID(required=False)
        idea_id = graphene.ID(required=False)

    def mutate(root, info, **kwargs):
        viewer = get_viewer()

        # Validation
        idea_id = kwargs.get("idea_id")
        comment_id = kwargs.get("comment_id")
        if not idea_id or not comment_id:
            raise ValueError("No idea or comment")
        existing_like = Like.query.filter(
            or_(
                and_(Like.idea_id == idea_id, Like.author_id == viewer.id),
                and_(Like.comment_id == comment_id, Like.comment_id == viewer.id),
            )
        )
        if existing_like:
            raise ValueError("Like Already Found")

        like = Like(
            idea_id=idea_id,
            comment_id=comment_id,
            author_id=viewer.id,
        )
        db.session.add(like)
        db.session.commit()
        return CreateLike(like=like)

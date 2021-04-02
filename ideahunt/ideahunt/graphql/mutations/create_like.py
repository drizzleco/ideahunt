import graphene
from sqlalchemy import and_, or_

from ideahunt.graphql.objects import LikeModel
from ideahunt.helpers import get_viewer
from ideahunt.models import Comment, Like, db


class CreateLike(graphene.Mutation):
    id = graphene.ID()
    comment_id = graphene.ID()
    idea_id = graphene.ID()

    class Arguments:
        idea_id = graphene.ID(required=False)
        comment_id = graphene.ID(required=False)

    def mutate(root, info, **kwargs):
        viewer = info.context.get("viewer")

        # Validation
        idea_id = kwargs.get("idea_id")
        comment_id = kwargs.get("comment_id")
        if not idea_id and not comment_id:
            raise ValueError("No idea or comment")
        if idea_id and comment_id:
            raise ValueError("Can't like both an idea and comment")
        existing_like = Like.query.filter(
            or_(
                and_(
                    Like.idea_id.isnot(None), Like.idea_id == idea_id, Like.author_id == viewer.id
                ),
                and_(
                    Like.comment_id.isnot(None),
                    Like.comment_id == comment_id,
                    Like.author_id == viewer.id,
                ),
            )
        ).first()
        if existing_like:
            raise ValueError("Like Already Found")

        like = Like(
            idea_id=idea_id,
            comment_id=comment_id,
            author_id=viewer.id,
        )
        db.session.add(like)
        db.session.commit()
        return CreateLike(id=like.id, idea_id=like.idea_id, comment_id=like.comment_id)

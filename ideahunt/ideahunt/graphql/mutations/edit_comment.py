import graphene

from ideahunt.graphql.objects import CommentModel
from ideahunt.helpers import assert_authenticated_user
from ideahunt.models import Comment, db


class EditComment(graphene.Mutation):
    """
    Edit Comment mutation
    """

    comment = graphene.Field(lambda: CommentModel)

    class Arguments:
        description = graphene.String(required=True)
        comment_id = graphene.ID(required=True)

    def mutate(root, info, **kwargs):
        assert_authenticated_user(info.context)
        comment = Comment.query.get(kwargs.get("comment_id"))
        comment.description = kwargs.get("description")
        db.session.commit()
        return EditComment(comment=comment)

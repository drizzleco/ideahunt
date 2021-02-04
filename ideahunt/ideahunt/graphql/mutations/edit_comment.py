import graphene

from ideahunt.graphql.objects import CommentModel
from ideahunt.models import Comment, db


class EditComment(graphene.Mutation):
    """
    Edit Comment mutation
    """

    comment = graphene.Field(lambda: CommentModel)

    class Arguments:
        comment = graphene.String(required=True)
        comment_id = graphene.ID(required=True)

    def mutate(root, info, **kwargs):
        comment = Comment.query.get(kwargs.get("comment_id"))
        comment.description = kwargs.get("comment")
        db.session.commit()
        return EditComment(comment=comment)

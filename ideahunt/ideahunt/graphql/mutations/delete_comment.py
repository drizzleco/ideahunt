import graphene

from ideahunt.graphql.objects import IdeaModel
from ideahunt.models import Comment, db


class DeleteComment(graphene.Mutation):
    """
    Delete Comment mutation
    """

    id = graphene.Field(graphene.ID)

    class Arguments:
        comment_id = graphene.ID(required=True)

    def mutate(root, info, comment_id, **kwargs):
        comment = Comment.query.get(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return DeleteComment(id=id)

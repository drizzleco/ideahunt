import graphene

from ideahunt.graphql.objects import CommentModel
from ideahunt.models import Comment, db
from ideahunt.helpers import get_viewer


class CreateComment(graphene.Mutation):
    """
    Create Comment mutation
    """

    comment = graphene.Field(lambda: CommentModel)

    class Arguments:
        description = graphene.String(required=True)
        idea_id = graphene.ID(required=True)

    def mutate(root, info, **kwargs):
        viewer = get_viewer()
        comment = Comment(
            description=kwargs.get("description"),
            idea_id=kwargs.get("idea_id"),
            author_id=viewer.id,
        )
        db.session.add(comment)
        db.session.commit()
        return CreateComment(comment=comment)

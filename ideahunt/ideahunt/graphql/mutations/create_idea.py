import graphene

from ideahunt.graphql.objects import IdeaModel
from ideahunt.helpers import get_viewer
from ideahunt.models import Idea, db


class CreateIdea(graphene.Mutation):
    """
    Create Idea mutation
    """

    idea = graphene.Field(lambda: IdeaModel)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        version = graphene.Int(default_value=0)

    def mutate(root, info, **kwargs):
        viewer = get_viewer()
        idea = Idea(
            title=kwargs.get("title"),
            description=kwargs.get("description"),
            version=kwargs.get("version"),
            author_id=viewer.id,
        )
        db.session.add(idea)
        db.session.commit()
        return CreateIdea(idea=idea)

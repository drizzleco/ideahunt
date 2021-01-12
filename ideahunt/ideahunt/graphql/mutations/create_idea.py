import graphene

from ideahunt.graphql.objects import IdeaModel
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
        author_id = graphene.Int()

    def mutate(root, info, **kwargs):
        idea = Idea(
            title=kwargs.get("title"),
            description=kwargs.get("description"),
            version=kwargs.get("version"),
            author_id=kwargs.get("author_id"),
        )
        db.session.add(idea)
        db.session.commit()
        return CreateIdea(idea=idea)

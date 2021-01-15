import graphene

from ideahunt.graphql.objects import IdeaModel
from ideahunt.models import Idea, db


class EditIdea(graphene.Mutation):
    """
    Edit Idea mutation
    """

    idea = graphene.Field(lambda: IdeaModel)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        idea_id = graphene.ID(required=True)

    def mutate(root, info, idea_id, **kwargs):
        idea = Idea.query.get(idea_id)
        idea.title = kwargs.get("title", idea.title)
        idea.description = kwargs.get("description", idea.description)
        idea.version += 1
        db.session.commit()
        return EditIdea(idea=idea)

import graphene

from ideahunt.graphql.objects import IdeaModel
from ideahunt.models import Idea, db


class DeleteIdea(graphene.Mutation):
    """
    Delete Idea mutation
    """

    id = graphene.Field(graphene.ID)

    class Arguments:
        idea_id = graphene.ID(required=True)

    def mutate(root, info, idea_id, **kwargs):
        idea = Idea.query.get(idea_id)
        db.session.delete(idea)
        db.session.commit()
        return DeleteIdea(id=id)

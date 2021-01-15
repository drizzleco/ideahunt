from typing import List, Optional

import graphene

from ideahunt.graphql.mutations.create_idea import CreateIdea
from ideahunt.graphql.mutations.edit_idea import EditIdea
from ideahunt.graphql.objects import IdeaModel
from ideahunt.models import Idea


class Query(graphene.ObjectType):
    """
    Base Query
    """

    idea = graphene.Field(IdeaModel, id=graphene.ID(required=True))
    ideas = graphene.Field(graphene.List(IdeaModel))

    def resolve_idea(root, info, id) -> Optional[Idea]:
        """
        Parse idea query and return data
        """
        return IdeaModel.get_query(info).filter_by(id=id).first()

    def resolve_ideas(root, info, **args) -> List[Idea]:
        """
        Return ideas
        """
        return IdeaModel.get_query(info).all()


class Mutation(graphene.ObjectType):
    """
    Base Mutation
    """

    create_idea = CreateIdea.Field()
    edit_idea = EditIdea.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

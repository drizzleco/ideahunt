import graphene

from ideahunt.graphql.mutations.create_idea import CreateIdea
from ideahunt.graphql.objects import IdeaModel, UserModel


class Query(graphene.ObjectType):
    """
    Base Query
    """

    ideas = graphene.Field(graphene.List(IdeaModel))

    def resolve_ideas(self, info, **args):
        """
        Parse idea query and return data
        """
        print("lksdjflkdsjf")
        return IdeaModel.get_query(info).all()


class Mutation(graphene.ObjectType):
    """
    Base Mutation
    """

    create_idea = CreateIdea.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

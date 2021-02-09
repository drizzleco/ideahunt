from typing import List, Optional

import graphene

from ideahunt.graphql.mutations.create_comment import CreateComment
from ideahunt.graphql.mutations.create_idea import CreateIdea
from ideahunt.graphql.mutations.create_like import CreateLike
from ideahunt.graphql.mutations.delete_comment import DeleteComment
from ideahunt.graphql.mutations.delete_idea import DeleteIdea
from ideahunt.graphql.mutations.delete_like import DeleteLike
from ideahunt.graphql.mutations.edit_comment import EditComment
from ideahunt.graphql.mutations.edit_idea import EditIdea
from ideahunt.graphql.objects import IdeaModel, UserModel
from ideahunt.helpers import get_viewer
from ideahunt.models import Idea, User, db


class Query(graphene.ObjectType):
    """
    Base Query
    """

    idea = graphene.Field(IdeaModel, id=graphene.ID(required=True))
    ideas = graphene.Field(graphene.List(IdeaModel))
    viewer = graphene.Field(UserModel)

    def resolve_idea(root, info, id) -> Optional[Idea]:
        return IdeaModel.get_query(info).filter_by(id=id).first()

    def resolve_ideas(root, info, **args) -> List[Idea]:
        return IdeaModel.get_query(info).all()

    def resolve_viewer(root, info, **args) -> User:
        return get_viewer()


class Mutation(graphene.ObjectType):
    """
    Base Mutation
    """

    # Idea Mutations
    create_idea = CreateIdea.Field()
    delete_idea = DeleteIdea.Field()
    edit_idea = EditIdea.Field()

    # Comment Mutations
    create_comment = CreateComment.Field()
    delete_comment = DeleteComment.Field()
    edit_comment = EditComment.Field()

    # Like Mutations
    create_like = CreateLike.Field()
    delete_like = DeleteLike.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

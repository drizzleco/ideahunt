from typing import List, Optional

import graphene
from rx import Observable

from ideahunt.graphql.mutations.create_comment import CreateComment
from ideahunt.graphql.mutations.create_follow import CreateFollow
from ideahunt.graphql.mutations.create_idea import CreateIdea
from ideahunt.graphql.mutations.create_like import CreateLike
from ideahunt.graphql.mutations.delete_comment import DeleteComment
from ideahunt.graphql.mutations.delete_follow import DeleteFollow
from ideahunt.graphql.mutations.delete_idea import DeleteIdea
from ideahunt.graphql.mutations.delete_like import DeleteLike
from ideahunt.graphql.mutations.edit_comment import EditComment
from ideahunt.graphql.mutations.edit_idea import EditIdea
from ideahunt.graphql.objects import IdeaModel, UserModel
from ideahunt.helpers import get_viewer
from ideahunt.models import Idea, User, db


class Query(graphene.ObjectType):
    idea = graphene.Field(IdeaModel, id=graphene.ID(required=True))
    ideas = graphene.Field(graphene.List(IdeaModel))
    viewer = graphene.Field(UserModel)
    users = graphene.Field(graphene.List(UserModel))
    user = graphene.Field(UserModel, user_id=graphene.ID(required=True))

    def resolve_idea(root, info, id) -> Optional[Idea]:
        return IdeaModel.get_query(info).filter_by(id=id).first()

    def resolve_ideas(root, info, **args) -> List[Idea]:
        return IdeaModel.get_query(info).all()

    def resolve_viewer(root, info, **args) -> User:
        return get_viewer()

    def resolve_users(root, info, **args) -> List[User]:
        return UserModel.get_query(info).all()

    def resolve_user(root, info, user_id) -> Optional[User]:
        return UserModel.get_query(info).filter_by(id=user_id).first()


class Mutation(graphene.ObjectType):
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

    # Follow Mutation
    create_follow = CreateFollow.Field()
    delete_follow = DeleteFollow.Field()


class Subscription(graphene.ObjectType):
    count_seconds = graphene.Float(up_to=graphene.Int())

    def resolve_count_seconds(root, info, up_to):
        return (
            Observable.interval(1000)
            .map(lambda i: "{0}".format(i))
            .take_while(lambda i: int(i) <= up_to)
        )


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)

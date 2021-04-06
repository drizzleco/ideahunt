from typing import List, Optional, Union

import graphene
from graphene import ResolveInfo
from graphql.error.base import GraphQLError
from rx import Observable
from sqlalchemy import desc, asc, or_

from ideahunt.graphql.mutations.auth import LogIn, Register
from ideahunt.graphql.mutations.create_comment import CreateComment
from ideahunt.graphql.mutations.create_follow import CreateFollow
from ideahunt.graphql.mutations.create_idea import CreateIdea
from ideahunt.graphql.mutations.create_like import CreateLike
from ideahunt.graphql.mutations.create_message import CreateMessage
from ideahunt.graphql.mutations.delete_comment import DeleteComment
from ideahunt.graphql.mutations.delete_follow import DeleteFollow
from ideahunt.graphql.mutations.delete_idea import DeleteIdea
from ideahunt.graphql.mutations.delete_like import DeleteLike
from ideahunt.graphql.mutations.edit_comment import EditComment
from ideahunt.graphql.mutations.edit_idea import EditIdea
from ideahunt.graphql.objects import IdeaModel, UserModel
from ideahunt.helpers import assert_authenticated_user
from ideahunt.models import Idea, User


class IdeasWithCursor(graphene.ObjectType):
    cursor = graphene.Field(graphene.Int)
    ideas = graphene.Field(graphene.List(IdeaModel))


class UsersWithCursor(graphene.ObjectType):
    cursor = graphene.Field(graphene.Int)
    users = graphene.Field(graphene.List(UserModel))


class Query(graphene.ObjectType):
    idea = graphene.Field(IdeaModel, id=graphene.ID(required=True))
    more_ideas = graphene.Field(
        IdeasWithCursor,
        cursor=graphene.ID(required=False),
        limit=graphene.Int(required=False),
    )
    viewer = graphene.Field(UserModel)
    users = graphene.Field(graphene.List(UserModel))
    more_users = graphene.Field(
        UsersWithCursor,
        query=graphene.NonNull(graphene.String),
        cursor=graphene.ID(required=False),
        limit=graphene.Int(required=False),
    )
    user = graphene.Field(UserModel, user_id=graphene.ID(required=True))
    messages = graphene.Field(graphene.List(graphene.String))

    def resolve_idea(root, info: ResolveInfo, id: Union[str, int]) -> Optional[Idea]:
        assert_authenticated_user(info.context)
        return IdeaModel.get_query(info).filter_by(id=id).first()

    def resolve_more_ideas(
        root, info: ResolveInfo, cursor: Optional[int] = None, limit: Optional[int] = None, **args
    ) -> IdeasWithCursor:
        assert_authenticated_user(info.context)
        query = IdeaModel.get_query(info).order_by(desc(Idea.id))
        if cursor:
            cursor_query = Idea.query.with_entities(Idea.id).filter(Idea.id == cursor)
            query = query.filter(Idea.id < cursor_query)
        if limit:
            query = query.limit(limit)
        ideas = query.all()
        return IdeasWithCursor(cursor=ideas[-1].id if ideas else cursor, ideas=ideas)

    def resolve_viewer(root, info: ResolveInfo, **args) -> User:
        viewer = info.context.viewer
        return viewer

    def resolve_users(root, info: ResolveInfo, **args) -> List[User]:
        assert_authenticated_user(info.context)
        return UserModel.get_query(info).all()

    def resolve_more_users(
        root,
        info: ResolveInfo,
        query: str,
        cursor: Optional[int] = None,
        limit: Optional[int] = None,
        **args,
    ) -> UsersWithCursor:
        assert_authenticated_user(info.context)
        query = (
            UserModel.get_query(info)
            .order_by(asc(User.id))
            .filter(
                or_(User.username.ilike(f"%{query}%"), User.name.ilike(f"%{query}%")),
            )
        )
        if cursor:
            cursor_query = User.query.with_entities(User.id).filter(User.id == cursor)
            query = query.filter(User.id > cursor_query)
        if limit:
            query = query.limit(limit)
        users = query.all()
        return UsersWithCursor(cursor=users[-1].id if users else cursor, users=users)

    def resolve_user(root, info: ResolveInfo, user_id: Union[str, int]) -> Optional[User]:
        assert_authenticated_user(info.context)
        return UserModel.get_query(info).filter_by(id=user_id).first()

    def resolve_messages(root, info: ResolveInfo) -> List[str]:
        assert_authenticated_user(info.context)
        return []


class Mutation(graphene.ObjectType):
    # Auth
    log_in = LogIn.Field()
    register = Register.Field()

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

    create_message = CreateMessage.Field()


class Subscription(graphene.ObjectType):
    count_seconds = graphene.Field(graphene.Float, up_to=graphene.Int(required=True))
    echo_message = graphene.Field(graphene.String)

    def resolve_echo_message(root, info: ResolveInfo) -> Observable:
        from ideahunt.app import redis_base

        def redis_listener(observable):
            pubsub = redis_base.pubsub
            pubsub.subscribe("chat")
            for message in pubsub.listen():
                print(message)
                if message["type"] != "message":
                    continue
                data = message["data"].decode()
                observable.on_next(data)

        return Observable.create(redis_listener)

    def resolve_count_seconds(root, info: ResolveInfo, up_to: int) -> Observable:
        return (
            Observable.interval(1000)
            .map(lambda i: "{0}".format(i))
            .take_while(lambda i: int(i) <= up_to)
        )


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)

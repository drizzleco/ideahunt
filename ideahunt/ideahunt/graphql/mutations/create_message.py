import graphene
from ideahunt.helpers import assert_authenticated_user


class CreateMessage(graphene.Mutation):
    message = graphene.String()

    class Arguments:
        word = graphene.String(required=True)

    def mutate(root, info, **kwargs):
        assert_authenticated_user(info.context)
        from ideahunt.app import redis_base

        message = kwargs.get("word")
        redis_base.client.publish("chat", message)
        return CreateMessage(message=message)

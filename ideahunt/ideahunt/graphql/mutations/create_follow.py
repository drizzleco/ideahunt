import graphene

from ideahunt.graphql.objects import FollowModel
from ideahunt.helpers import assert_authenticated_user
from ideahunt.models import Follow, db


class CreateFollow(graphene.Mutation):
    follow = graphene.Field(lambda: FollowModel)

    class Arguments:
        followee_id = graphene.ID(required=True)

    def mutate(root, info, **kwargs):
        assert_authenticated_user(info.context)
        viewer = info.context.viewer
        follow = Follow(
            followee_id=kwargs.get("followee_id"),
            user_id=viewer.id,
        )
        db.session.add(follow)
        db.session.commit()
        return CreateFollow(follow=follow)

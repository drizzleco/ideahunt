import graphene

from ideahunt.helpers import assert_authenticated_user
from ideahunt.models import Follow, db


class DeleteFollow(graphene.Mutation):

    followee_id = graphene.Field(graphene.ID)
    user_id = graphene.Field(graphene.ID)

    class Arguments:

        followee_id = graphene.ID(required=True)

    def mutate(root, info, followee_id, **kwargs):
        assert_authenticated_user(info.context)
        viewer = info.context.viewer
        follow = Follow.query.filter_by(user_id=viewer.id, followee_id=followee_id).first()
        db.session.delete(follow)
        db.session.commit()
        return DeleteFollow(user_id=viewer.id, followee_id=followee_id)

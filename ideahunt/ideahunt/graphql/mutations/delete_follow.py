import graphene

from ideahunt.helpers import get_viewer
from ideahunt.models import Follow, db


class DeleteFollow(graphene.Mutation):

    followee_id = graphene.Field(graphene.ID)
    user_id = graphene.Field(graphene.ID)

    class Arguments:

        followee_id = graphene.ID(required=True)

    def mutate(root, info, followee_id, **kwargs):
        viewer = get_viewer()
        follow = Follow.query.filter_by(user_id=viewer.id, followee_id=followee_id).first()
        db.session.delete(follow)
        db.session.commit()
        return DeleteFollow(user_id=viewer.id, followee_id=followee_id)

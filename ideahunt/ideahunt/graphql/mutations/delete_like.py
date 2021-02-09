import graphene

from ideahunt.models import Like, db


class DeleteLike(graphene.Mutation):
    id = graphene.Field(graphene.ID)

    class Arguments:
        like_id = graphene.ID(required=False)

    def mutate(root, info, like_id, **kwargs):
        like = Like.query.get(like_id)
        db.session.delete(like)
        db.session.commit()
        return DeleteLike(id=like_id)

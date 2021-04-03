from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from flask_jwt_extended.utils import get_jwt_identity

from ideahunt.models import User, db

if TYPE_CHECKING:
    from ideahunt.graphql.graphqlview import GraphQLContext  # circular, what to do


def get_viewer(applied_username: Optional[str] = None) -> User:
    username = applied_username or get_jwt_identity()
    user = db.session.query(User).filter_by(username=username).first()
    return user


def assert_authenticated_user(context: GraphQLContext):
    if context.viewer is None:
        raise Exception("User Not Authenticated")

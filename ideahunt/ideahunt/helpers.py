#!/usr/bin/env python3
from flask_jwt_extended.utils import get_jwt_identity
from ideahunt.models import db, User
from sqlalchemy.orm.session import Session


def get_viewer() -> User:
    username = get_jwt_identity()
    user = db.session.query(User).filter_by(username=username).one()
    if not user:
        raise KeyError("Viewer not found")
    return user

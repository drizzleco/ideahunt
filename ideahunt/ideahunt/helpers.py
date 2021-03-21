#!/usr/bin/env python3
from typing import Optional

from flask_jwt_extended.utils import get_jwt_identity

from ideahunt.models import User, db


def get_viewer(applied_username: Optional[str] = None) -> User:
    username = applied_username or get_jwt_identity()
    user = db.session.query(User).filter_by(username=username).one()
    if not user:
        raise KeyError("Viewer not found")
    return user

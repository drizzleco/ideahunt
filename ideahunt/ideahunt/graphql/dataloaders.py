from typing import List

from promise import Promise
from promise.dataloader import DataLoader
from sqlalchemy import func

from ideahunt.helpers import get_viewer
from ideahunt.models import Like


class CommentLikeCountLoader(DataLoader):
    def batch_load_fn(self, ids: List[int]) -> Promise[List[int]]:
        likes = (
            Like.query.filter(Like.comment_id.in_(ids))
            .with_entities(func.count(Like.id).label("like_count"), Like.comment_id)
            .group_by(Like.comment_id)
        )
        comment_like_counts = {}
        for like in likes:
            comment_like_counts[like.comment_id] = like.like_count
        return Promise.resolve([comment_like_counts.get(comment_id, 0) for comment_id in ids])


class CommentViewerLikeLoader(DataLoader):
    def batch_load_fn(self, ids: List[int]) -> Promise[List[Like]]:
        viewer = get_viewer()
        likes = (
            Like.query.filter(Like.comment_id.in_(ids)).filter(Like.author_id == viewer.id).all()
        )
        comment_viewer_like = {}
        for like in likes:
            comment_viewer_like[like.comment_id] = like
        return Promise.resolve([comment_viewer_like.get(comment_id, None) for comment_id in ids])


class IdeaLikeCountLoader(DataLoader):
    def batch_load_fn(self, ids: List[int]) -> Promise[List[int]]:
        likes = (
            Like.query.filter(Like.idea_id.in_(ids))
            .with_entities(func.count(Like.id).label("like_count"), Like.idea_id)
            .group_by(Like.idea_id)
        )
        idea_like_counts = {}
        for like in likes:
            idea_like_counts[like.idea_id] = like.like_count
        return Promise.resolve([idea_like_counts.get(idea_id, 0) for idea_id in ids])


class IdeaViewerLikeLoader(DataLoader):
    def batch_load_fn(self, ids: List[int]) -> Promise[List[Like]]:
        viewer = get_viewer()
        likes = Like.query.filter(Like.idea_id.in_(ids)).filter(Like.author_id == viewer.id).all()
        idea_viewer_like = {}
        for like in likes:
            idea_viewer_like[like.idea_id] = like
        return Promise.resolve([idea_viewer_like.get(idea_id, None) for idea_id in ids])

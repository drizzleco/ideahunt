from dataclasses import dataclass
from typing import TYPE_CHECKING, Any, Dict, Optional

from flask_graphql.graphqlview import GraphQLView
from promise.dataloader import DataLoader

from ideahunt.graphql.dataloaders import (
    CommentLikeCountLoader,
    CommentViewerLikeLoader,
    IdeaLikeCountLoader,
    IdeaViewerLikeLoader,
)
from ideahunt.helpers import get_viewer
from ideahunt.models import User


@dataclass
class GraphQLContext:
    viewer: Optional[User]
    dataloaders: Dict[str, DataLoader]


class IdeahuntGraphQLView(GraphQLView):
    def get_context(self) -> Dict[str, Any]:
        viewer = get_viewer()

        if not viewer:
            dataloaders = {}  #  In unauthenticated endpoints, we don't instantiate dataloaders.
        else:
            dataloaders = {
                "comment_like_count_dataloader": CommentLikeCountLoader(),
                "comment_viewer_like_dataloader": CommentViewerLikeLoader(viewer_id=viewer.id),
                "idea_like_count_dataloader": IdeaLikeCountLoader(),
                "idea_viewer_like_dataloader": IdeaViewerLikeLoader(viewer_id=viewer.id),
            }
        return GraphQLContext(dataloaders=dataloaders, viewer=viewer)

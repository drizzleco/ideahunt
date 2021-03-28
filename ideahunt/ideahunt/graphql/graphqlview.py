from typing import Dict

from flask_graphql.graphqlview import GraphQLView
from promise.dataloader import DataLoader

from ideahunt.graphql.dataloaders import (
    CommentLikeCountLoader,
    CommentViewerLikeLoader,
    IdeaLikeCountLoader,
    IdeaViewerLikeLoader,
)
from ideahunt.helpers import get_viewer


class IdeahuntGraphQLView(GraphQLView):
    def get_context(self) -> Dict[str, Dict[str, DataLoader]]:
        viewer = get_viewer()
        dataloaders = {
            "comment_like_count_dataloader": CommentLikeCountLoader(),
            "comment_viewer_like_dataloader": CommentViewerLikeLoader(viewer_id=viewer.id),
            "idea_like_count_dataloader": IdeaLikeCountLoader(),
            "idea_viewer_like_dataloader": IdeaViewerLikeLoader(viewer_id=viewer.id),
        }
        return {"dataloaders": dataloaders, "viewer": viewer}

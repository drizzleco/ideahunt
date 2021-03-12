from flask_graphql.graphqlview import GraphQLView

from ideahunt.graphql.dataloaders import (
    CommentLikeCountLoader,
    CommentViewerLikeLoader,
    IdeaLikeCountLoader,
    IdeaViewerLikeLoader,
)


class IdeahuntGraphQLView(GraphQLView):
    def get_context(self):
        dataloaders = {
            "comment_like_count_dataloader": CommentLikeCountLoader(),
            "comment_viewer_like_dataloader": CommentViewerLikeLoader(),
            "idea_like_count_dataloader": IdeaLikeCountLoader(),
            "idea_viewer_like_dataloader": IdeaViewerLikeLoader(),
        }
        return {"dataloaders": dataloaders}

import { gql, useMutation } from "@apollo/client";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import styled from "styled-components/native";

import IconButton from "../components/IconButton";
import {
  CommentLikeItem_CreateLikeMutation,
  CommentLikeItem_CreateLikeMutationVariables,
  CommentLikeItem_DeleteLikeMutation,
  CommentLikeItem_DeleteLikeMutationVariables,
} from "../src/generated/graphql";
import { Comment } from "../types";

const LikeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LikeCount = styled.Text`
  font-weight: bold;
  color: black;
  font-size: 10px;
`;

const CommentLikeItem = ({
  comment,
  refetch,
}: {
  comment: Comment;
  refetch: () => void;
}) => {
  const [createLike] = useMutation<
    CommentLikeItem_CreateLikeMutation,
    CommentLikeItem_CreateLikeMutationVariables
  >(CommentLikeItem.createMutation, {
    onCompleted: refetch,
  });
  const [deleteLike] = useMutation<
    CommentLikeItem_DeleteLikeMutation,
    CommentLikeItem_DeleteLikeMutationVariables
  >(CommentLikeItem.deleteMutation, {
    onCompleted: refetch,
  });

  return (
    <LikeContainer>
      <LikeCount>{comment.likeCount}</LikeCount>
      <IconButton
        icon={comment.viewerLike ? faHeart : hollowHeart}
        color={comment.viewerLike ? "red" : "gray"}
        onPress={() => {
          comment.viewerLike
            ? deleteLike({ variables: { likeId: comment.viewerLike.id } })
            : createLike({ variables: { commentId: comment.id } });
        }}
      />
    </LikeContainer>
  );
};

CommentLikeItem.createMutation = gql`
  mutation CommentLikeItem_CreateLike($commentId: ID!) {
    createLike(commentId: $commentId) {
      id
      commentId
    }
  }
`;

CommentLikeItem.deleteMutation = gql`
  mutation CommentLikeItem_DeleteLike($likeId: ID!) {
    deleteLike(likeId: $likeId) {
      id
    }
  }
`;

export default CommentLikeItem;

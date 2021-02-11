import { gql, useMutation, useQuery } from "@apollo/client";
import { Idea, Comment, Like } from "../types";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";

import styled from "styled-components/native";

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

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const IconButton = ({ icon, onPress, color }) => {
  return (
    <IconContainer onPress={onPress}>
      <FontAwesomeIcon icon={icon} color={color} />
    </IconContainer>
  );
};

const CommentLikeItem = ({
  comment,
  refetch,
}: {
  comment: Comment;
  refetch: any;
}) => {
  const [createLike] = useMutation(CommentLikeItem.createMutation, {
    onCompleted: refetch,
  });
  const [deleteLike] = useMutation(CommentLikeItem.deleteMutation, {
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
  mutation LikeItem_CreateLike($commentId: ID!) {
    createLike(commentId: $commentId) {
      like {
        id
      }
    }
  }
`;

CommentLikeItem.deleteMutation = gql`
  mutation LikeItem_DeleteLike($likeId: ID!) {
    deleteLike(likeId: $likeId) {
      id
    }
  }
`;

export default CommentLikeItem;

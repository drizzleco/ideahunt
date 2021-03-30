import { gql, useMutation } from "@apollo/client";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import styled from "styled-components/native";

import IconButton from "../components/IconButton";
import { Idea, Comment } from "../types";
import Row from "./Row";
import Space from "./Space";

const LikeContainer = styled.View`
  background-color: #add8e6;
  border-radius: 10px;
  padding: 2px 10px;
  width: 40px;
  height: 18px;
  justify-content: center;
  align-items: center;
`;

const LikeCount = styled.Text`
  font-weight: bold;
  color: black;
  font-size: 10px;
`;

const IdeaLikeItem = ({
  idea,
  refetch,
}: {
  idea: Idea | Comment;
  refetch: any;
}) => {
  const [createLike] = useMutation(IdeaLikeItem.createMutation, {
    onCompleted: refetch,
  });
  const [deleteLike] = useMutation(IdeaLikeItem.deleteMutation, {
    onCompleted: refetch,
  });

  return (
    <LikeContainer>
      <Row>
        <LikeCount>{idea.likeCount}</LikeCount>
        <Space width={4} />
        <IconButton
          icon={idea.viewerLike ? faHeart : hollowHeart}
          size={14}
          color={idea.viewerLike ? "red" : "gray"}
          onPress={() => {
            idea.viewerLike
              ? deleteLike({ variables: { likeId: idea.viewerLike.id } })
              : createLike({ variables: { ideaId: idea.id } });
          }}
        />
      </Row>
    </LikeContainer>
  );
};

IdeaLikeItem.createMutation = gql`
  mutation LikeItem_CreateLike($ideaId: ID!) {
    createLike(ideaId: $ideaId) {
      like {
        id
      }
    }
  }
`;

IdeaLikeItem.deleteMutation = gql`
  mutation LikeItem_DeleteLike($likeId: ID!) {
    deleteLike(likeId: $likeId) {
      id
    }
  }
`;

export default IdeaLikeItem;

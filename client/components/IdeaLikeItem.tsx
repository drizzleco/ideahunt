import { gql, useMutation, useQuery } from "@apollo/client";
import { Idea, Comment, Like } from "../types";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";

import styled from "styled-components/native";

interface LikeContainerProps {
  color: string;
}

const LikeContainer = styled.View`
  background-color: #add8e6;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;

const LikeCount = styled.Text`
  font-weight: bold;
  color: black;
  font-size: 15px;
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
      <LikeCount>{idea.likeCount}</LikeCount>
      <IconButton
        icon={idea.viewerLike ? faHeart : hollowHeart}
        color={idea.viewerLike ? "red" : "gray"}
        onPress={() => {
          idea.viewerLike
            ? deleteLike({ variables: { likeId: idea.viewerLike.id } })
            : createLike({ variables: { ideaId: idea.id } });
        }}
      />
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

import { gql, useMutation } from "@apollo/client";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import styled from "styled-components/native";

import IconButton from "../components/IconButton";
import { Idea, Comment } from "../types";
import Row from "./Row";
import Space from "./Space";

const LikeContainer = styled.TouchableOpacity`
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

const IdeaLikeItem = ({ idea }: { idea: Idea | Comment }) => {
  const [createLike] = useMutation(IdeaLikeItem.createMutation, {
    update(cache, { data: { createLike } }) {
      cache.modify({
        id: cache.identify(idea),
        fields: {
          viewerLike(existingViewerLike = null) {
            const newLikeRef = cache.writeFragment({
              data: createLike,
              fragment: gql`
                fragment NewLike on Like {
                  id
                  ideaId
                }
              `,
            });
            return newLikeRef;
          },
          likeCount(originalCount = 0) {
            return originalCount + 1;
          },
        },
      });
    },
  });
  const [deleteLike] = useMutation(IdeaLikeItem.deleteMutation, {
    update(cache, { data: { deleteLike } }) {
      cache.modify({
        id: cache.identify(idea),
        fields: {
          viewerLike(existingViewerLike = null) {
            return null;
          },
          likeCount(originalCount = 0) {
            return originalCount - 1;
          },
        },
      });
    },
  });

  return (
    <LikeContainer
      onPress={() => {
        idea.viewerLike
          ? deleteLike({ variables: { likeId: idea.viewerLike.id } })
          : createLike({ variables: { ideaId: idea.id } });
      }}
    >
      <Row>
        <LikeCount>{idea.likeCount}</LikeCount>
        <Space width={4} />
        <IconButton
          disabled={true}
          icon={idea.viewerLike ? faHeart : hollowHeart}
          size={14}
          color={idea.viewerLike ? "red" : "gray"}
        />
      </Row>
    </LikeContainer>
  );
};

IdeaLikeItem.createMutation = gql`
  mutation LikeItem_CreateLike($ideaId: ID!) {
    createLike(ideaId: $ideaId) {
      id
      ideaId
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

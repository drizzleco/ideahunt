import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { formatDistance } from "date-fns";
import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import IdeaLikeItem from "../components/IdeaLikeItem";
import Space from "../components/Space";
import useIsMobile from "../hooks/useIsMobile";
import { Idea } from "../types";

import Row from "./Row";

const IdeaContainer = styled.TouchableOpacity`
  background-color: #faf0e6;
  border-radius: 20px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  flex: 1;
`;

const IdeaContent = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const InfoText = styled.Text`
  font-size: 12px;
`;

const IdeaItem = ({ idea, hideLike }: { idea: Idea; hideLike?: boolean }) => {
  const navigation = useNavigation();

  return (
    <>
      <IdeaContent>
        <IdeaContainer
          onPress={() => {
            navigation.navigate("Home", {
              screen: "IdeaScreen",
              params: { id: idea.id },
            });
          }}
        >
          <Row style={{ justifyContent: "space-between" }}>
            <Title>{idea.title}</Title>
          </Row>
          <Space height={2} />
          <InfoText style={{ fontSize: 14 }} numberOfLines={4}>
            {idea.description}
          </InfoText>
          <Space height={2} />
          <Row>
            <InfoText style={{ fontWeight: "bold" }}>
              {idea.author.name}
            </InfoText>
            <Space width={8} />
            <InfoText style={{ color: "gray" }}>
              @{idea.author.username}
            </InfoText>
            <Space width={8} />
            <InfoText style={{ color: "gray" }}>
              {formatDistance(
                new Date(idea.createdAt),
                Date.now() + new Date().getTimezoneOffset() * 60 * 1000,
                {
                  addSuffix: true,
                }
              )}
            </InfoText>
          </Row>
          <Space height={2} />
          {!hideLike && (
            <Row style={{ justifyContent: "center" }}>
              <IdeaLikeItem idea={idea} />
            </Row>
          )}
        </IdeaContainer>
      </IdeaContent>
      <Space height={4} />
    </>
  );
};

const IdeasListContainer = styled.View<{ isMobile?: boolean }>`
  flex-grow: 1;
  width: ${(props) => (props.isMobile ? "100%" : "40%")};
  padding: 0 10px;
`;

const IdeasList = ({
  ideas,
  hideLike,
  onEndReachedThreshold,
  onEndReached,
}: {
  ideas: Idea[];
  hideLike?: boolean;
  onEndReachedThreshold?: number;
  onEndReached?: () => any;
}) => {
  const isMobile = useIsMobile();
  return (
    <IdeasListContainer isMobile={isMobile}>
      <FlatList
        data={ideas}
        renderItem={({ item }) => <IdeaItem idea={item} hideLike={hideLike} />}
        keyExtractor={(item: Idea) => item.id}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onEndReached}
      ></FlatList>
    </IdeasListContainer>
  );
};

IdeasList.fragment = gql`
  fragment IdeasList on IdeaModel {
    id
    description
    title
    likeCount
    createdAt
    author {
      id
      name
      username
    }
    viewerLike {
      id
    }
  }
`;

export default IdeasList;

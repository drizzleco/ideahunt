import { gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import IdeaLikeItem from "../components/IdeaLikeItem";
import Space from "../components/Space";
import { Idea } from "../types";

const IdeaContainer = styled.TouchableOpacity`
  background-color: #faf0e6;
  border-radius: 20px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  min-width: 200px;
`;

const IdeaContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const IdeaItem = ({ idea, refetch }: { idea: Idea; refetch: any }) => {
  const navigation = useNavigation();

  return (
    <>
      <IdeaContent>
        <IdeaLikeItem idea={idea} refetch={refetch} />
        <IdeaContainer
          onPress={() => {
            navigation.navigate("Home", {
              screen: "IdeaScreen",
              params: { id: idea.id },
            });
          }}
        >
          <Title>{idea.title}</Title>
        </IdeaContainer>
      </IdeaContent>
      <Space height={4} />
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

const IdeasList = ({ ideas, refetch }: { ideas: Idea[]; refetch: any }) => {
  return (
    <Container>
      <FlatList
        data={ideas}
        renderItem={({ item }) => <IdeaItem idea={item} refetch={refetch} />}
        keyExtractor={(item: Idea) => item.id}
      ></FlatList>
    </Container>
  );
};

IdeasList.fragment = gql`
  fragment IdeasList on UserModel {
    ideas {
      id
      description
      title
      likeCount
      viewerLike {
        id
      }
    }
  }
`;

export default IdeasList;

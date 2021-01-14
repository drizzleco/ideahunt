import * as React from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components/native";
import { FlatList, ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Idea {
  id: string;
  description: string;
  title: string;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const IdeaContainer = styled.TouchableOpacity`
  background-color: #f612f3;
  border-radius: 4px;
`;

const IdeaItem = ({ idea }: { idea: Idea }) => {
  const navigation = useNavigation();

  return (
    <IdeaContainer
      onPress={() => {
        navigation.navigate("IdeaScreen", { id: idea.id });
      }}
    >
      <Title>{idea.title}</Title>
    </IdeaContainer>
  );
};

const renderItem: ListRenderItem<Idea> = ({ item }) => {
  return <IdeaItem idea={item} />;
};

const HomeScreen = () => {
  const { loading, error, data } = useQuery(HomeScreen.query);

  if (loading) {
    return null;
  }
  if (error) {
    return `error! ${error.message}`;
  }

  return (
    <Container>
      <Title> Hi </Title>
      <FlatList
        data={data.ideas}
        renderItem={renderItem}
        keyExtractor={(item: Idea) => item.id}
      ></FlatList>
    </Container>
  );
};

HomeScreen.query = gql`
  query IdeasList {
    ideas {
      id
      description
      title
    }
  }
`;

export default HomeScreen;

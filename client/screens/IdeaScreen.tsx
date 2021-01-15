import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const Description = styled.Text`
  font-size: 10px;
`;

const IdeaButton = styled.Button``;

const EditIdeaButton = ({ id }) => {
  const navigation = useNavigation();

  return (
    <IdeaButton
      onPress={() => {
        navigation.navigate("EditIdeaScreen", { id });
      }}
      title="Edit Idea"
    />
  );
};

const IdeaScreen = ({ route }) => {
  const { id } = route.params;
  const { loading, error, data } = useQuery(IdeaScreen.query, {
    variables: { id },
  });

  if (loading) {
    return null;
  }
  if (error) {
    return <Title>error! {error.message}</Title>;
  }

  return (
    <Container>
      <EditIdeaButton id={data.idea.id} />
      <Title>{data.idea.title}</Title>
      <Description>{data.idea.description}</Description>
    </Container>
  );
};

IdeaScreen.query = gql`
  query IdeasScreen($id: ID!) {
    idea(id: $id) {
      id
      description
      title
    }
  }
`;

export default IdeaScreen;

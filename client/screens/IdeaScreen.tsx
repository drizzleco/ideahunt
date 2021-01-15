import * as React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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
  color: red;
`;

const RegularButton = styled.Button``;

const EditIdeaButton = ({ id }) => {
  const navigation = useNavigation();

  return (
    <RegularButton
      onPress={() => {
        navigation.navigate("EditIdeaScreen", { id });
      }}
      title="Edit Idea"
    />
  );
};

const DeleteIdeaButton = ({ id }) => {
  const navigation = useNavigation();
  const [deleteIdea] = useMutation(DeleteIdeaButton.mutation);

  return (
    <RegularButton
      style={{ backgroundColor: "red" }}
      onPress={() => {
        deleteIdea({ variables: { ideaId: id } });
        navigation.navigate("HomeScreen");
      }}
      color={"red"}
      title="Delete"
    />
  );
};

DeleteIdeaButton.mutation = gql`
  mutation DeleteIdea($ideaId: ID!) {
    deleteIdea(ideaId: $ideaId) {
      id
    }
  }
`;

const IdeaScreen = ({ route }) => {
  const { id } = route.params;
  const { loading, error, data } = useQuery(IdeaScreen.query, {
    variables: { id },
  });

  if (loading || !data.idea) {
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
      <DeleteIdeaButton id={data.idea.id} />
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

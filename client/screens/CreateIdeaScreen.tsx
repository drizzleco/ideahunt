import * as React from "react";
import { gql, useMutation } from "@apollo/client";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const CreateIdeaScreen = () => {
  // const [createIdea, { data }] = useMutation(CreateIdeaScreen.mutation);
  return (
    <Container>
      <Title>Create a new idea!</Title>
    </Container>
  );
};

//CreateIdeaScreen.mutation = gql`
//  mutation CreateIdeaButton($description: String!, $title: String!) {
//    createIdea(description: $description, title: $title) {
//      id
//      description
//      title
//    }
//  }
//`;

export default CreateIdeaScreen;

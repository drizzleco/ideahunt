import * as React from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const HomeScreen = () => {
  const { loading, error, data } = useQuery(HomeScreen.query);

  console.log(loading, error, data);
  if (loading) {
    return null;
  }
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <Container>
      <Title> Hi </Title>
      <Title>{data.idea}</Title>
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

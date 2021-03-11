import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import Space from "../components/Space";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const NewUserScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Welcome to the land of ideas~</Title>
      <Space height={40} width={0} />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      />
      <Space height={10} width={0} />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      />
    </Container>
  );
};

export default NewUserScreen;

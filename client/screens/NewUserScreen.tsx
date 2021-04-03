import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";

const Title = styled.Text`
  font-size: 40px;
`;

const NewUserScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Title>IdeaHunt</Title>
      <Space height={40} width={0} />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      />
    </ScreenContainer>
  );
};

export default NewUserScreen;

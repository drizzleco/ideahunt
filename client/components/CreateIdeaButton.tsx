import * as React from "react";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";

const IdeaButton = styled.Button``;

const CreateIdeaButton = () => {
  const navigation = useNavigation();

  return (
    <IdeaButton
      onPress={() => {
        navigation.navigate("CreateIdeaScreen");
      }}
      title="Add Idea"
    />
  );
};

export default CreateIdeaButton;

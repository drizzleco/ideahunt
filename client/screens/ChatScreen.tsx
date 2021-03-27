import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fffff7;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

const EchoMessage = () => {
  const { data, loading } = useSubscription(EchoMessage.subscription);

  if (loading || !data) {
    return null;
  }
  return <Title>{data.echoMessage}</Title>;
};

EchoMessage.subscription = gql`
  subscription EchoMessage {
    echoMessage
  }
`;

const CreateMessageButton = () => {
  const [createMessage] = useMutation(CreateMessageButton.mutation);
  return (
    <Button
      title={"Generate a new message"}
      onPress={() => {
        var things = ["Rock", "Paper", "Scissor"];
        var thing = things[Math.floor(Math.random() * things.length)];
        createMessage({ variables: { word: thing } });
      }}
    />
  );
};

CreateMessageButton.mutation = gql`
  mutation CreateMessage($word: String!) {
    createMessage(word: $word) {
      message
    }
  }
`;

const SecondsCounter = () => {
  const upTo = 10;
  const { data, loading } = useSubscription(SecondsCounter.subscription, {
    variables: { upTo },
  });

  if (loading || !data) {
    return null;
  }
  return <Title>{data.countSeconds}</Title>;
};

SecondsCounter.subscription = gql`
  subscription SecondsCounter($upTo: Int!) {
    countSeconds(upTo: $upTo)
  }
`;

const ChatScreen = () => {
  return (
    <Container>
      <Title> Chat</Title>
      <SecondsCounter />
      <EchoMessage />
      <CreateMessageButton />
    </Container>
  );
};

export default ChatScreen;

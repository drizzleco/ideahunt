import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Formik } from "formik";
import _ from "lodash";
import * as React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import Row from "../components/Row";
import ScreenContainer from "../components/ScreenContainer";

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  font-size: 20px;
  border: 1px solid;
  border-radius: 2px;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  color: red;
`;

const Field = styled.View`
  flex: 1;
`;

const ChatView = styled.View`
  flex: 1;
`;

const MessagesContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const MessageContainer = styled.View`
  align-items: center;
`;

const EchoMessage = () => {
  const { subscribeToMore, data, loading } = useQuery(EchoMessage.query);

  React.useEffect(() => {
    subscribeToMore({
      document: EchoMessage.subscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.echoMessage;
        return _.assign({}, prev, { messages: [...prev.messages, newMessage] });
      },
    });
  }, []);

  if (loading || !data) {
    return null;
  }
  return data.messages.map((message: string, index: number) => (
    <MessageContainer key={`MessagesContainer.${index}`}>
      <Title key={index}>{message}</Title>
    </MessageContainer>
  ));
};

EchoMessage.query = gql`
  query EchoMessage_Query {
    messages
  }
`;

EchoMessage.subscription = gql`
  subscription EchoMessage_Subscription {
    echoMessage
  }
`;

const CreateMessageButton = () => {
  const [createMessage] = useMutation(CreateMessageButton.mutation);

  return (
    <Row style={{ width: "100%" }}>
      <Formik
        initialValues={{
          word: "",
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.word) {
            errors.word = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          createMessage({
            variables: values,
            onCompleted: () => {
              resetForm();
            },
          });
        }}
      >
        {({ handleBlur, handleChange, errors, handleSubmit, values }) => (
          <>
            <Field>
              <Input
                autoCapitalize="none"
                value={values.word}
                onBlur={handleBlur("word")}
                onChangeText={handleChange("word")}
              />
              {errors.word && <ErrorText>{errors.word}</ErrorText>}
            </Field>
            <Button title="Submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Row>
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
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <ScreenContainer>
      <Title>Chat</Title>
      <ChatView>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={140}
        >
          <MessagesContainer>
            <ScrollView
              ref={scrollViewRef}
              style={{ width: "100%" }}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              onContentSizeChange={() =>
                scrollViewRef?.current?.scrollToEnd({ animated: true })
              }
            >
              <EchoMessage />
            </ScrollView>
          </MessagesContainer>
          <CreateMessageButton />
        </KeyboardAvoidingView>
      </ChatView>
    </ScreenContainer>
  );
};

export default ChatScreen;

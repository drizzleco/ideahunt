import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import TextInput from "../components/TextInput";

const Title = styled.Text`
  font-size: 40px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

const ErrorLabel = styled.Text`
  font-size: 20px;
  color: red;
`;

interface GeneratedIdea {
  title: string;
  description: string;
}

const CreateIdeaScreen = () => {
  const navigation = useNavigation();
  const [createIdea, { error }] = useMutation<{ createIdea: GeneratedIdea }>(
    CreateIdeaScreen.mutation
  );
  return (
    <ScreenContainer>
      <Title>Create a new idea!</Title>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={(values, { resetForm }) => {
          createIdea({ variables: values });
          resetForm();
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScreenContainer>
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
              <Label>Title</Label>
              <Space height={8} />
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              <Space height={20} />
              <Label>Description</Label>
              <Space height={8} />
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline={true}
                numberOfLines={4}
              />
              <Space height={20} />
              <Button
                onPress={() => {
                  handleSubmit();
                }}
                title="Create Idea"
              />
              {error ? <ErrorLabel> {error.message} </ErrorLabel> : null}
            </KeyboardAvoidingView>
          </ScreenContainer>
        )}
      </Formik>
    </ScreenContainer>
  );
};

CreateIdeaScreen.mutation = gql`
  mutation CreateIdeaButton($description: String!, $title: String!) {
    createIdea(description: $description, title: $title) {
      idea {
        id
        description
        title
      }
    }
  }
`;

export default CreateIdeaScreen;

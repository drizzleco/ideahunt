import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
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

const Label = styled.Text`
  font-size: 20px;
`;

const Input = styled.TextInput``;

const Submit = styled.Button``;

const CreateIdeaScreen = () => {
  const navigation = useNavigation();
  const [createIdea, { data }] = useMutation(CreateIdeaScreen.mutation);
  return (
    <Container>
      <Title>Create a new idea!</Title>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={(values) => {
          createIdea({ variables: values });
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Container>
            <Label>Title</Label>
            <Input
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <Label>Description</Label>
            <Input
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            <Submit onPress={handleSubmit} title="Create Idea" />
          </Container>
        )}
      </Formik>
    </Container>
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

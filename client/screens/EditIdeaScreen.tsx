import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import * as React from "react";
import styled from "styled-components/native";

import Loading from "../components/Loading";
import { HomeScreenParamList } from "../types";

import IdeaScreen from "./IdeaScreen";

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

type EditIdeaScreenProps = StackScreenProps<
  HomeScreenParamList,
  "EditIdeaScreen"
>;

// jank. TODO: make this a modal instead, so we can pass in the data without having to re-query
const EditIdeaScreen = ({ route }: EditIdeaScreenProps) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { loading, error, data: queryData } = useQuery(IdeaScreen.query, {
    variables: { id },
  });
  const [editIdea] = useMutation(EditIdeaScreen.mutation);
  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }

  if (error) {
    return <Title>error! {error.message}</Title>;
  }

  return (
    <Container>
      <Title>Edit your idea!</Title>
      <Formik
        initialValues={{
          ideaId: id,
          title: queryData.idea.title,
          description: queryData.idea.description,
        }}
        onSubmit={(values) => {
          editIdea({ variables: values });
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Container>
            <Label>Title</Label>
            <Input
              autoCapitalize={"none"}
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
            <Submit
              onPress={() => {
                handleSubmit();
              }}
              title="Submit"
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

EditIdeaScreen.mutation = gql`
  mutation EditIdeaButton(
    $ideaId: ID!
    $description: String!
    $title: String!
  ) {
    editIdea(ideaId: $ideaId, description: $description, title: $title) {
      idea {
        id
        description
        title
      }
    }
  }
`;

export default EditIdeaScreen;

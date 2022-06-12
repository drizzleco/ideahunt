import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import Loading from "../components/Loading";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import { HomeScreenParamList } from "../types";

import IdeaScreen from "./IdeaScreen";

const Title = styled.Text`
  font-size: 40px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

type EditIdeaScreenProps = StackScreenProps<
  HomeScreenParamList,
  "EditIdeaScreen"
>;

// jank. TODO: make this a modal instead, so we can pass in the data without having to re-query
const EditIdeaScreen = ({ route }: EditIdeaScreenProps) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(IdeaScreen.query, {
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
    <ScreenContainer>
      <Title>Edit your idea!</Title>
      <Formik
        initialValues={{
          ideaId: id,
          title: queryData.idea.title,
          description: queryData.idea.description,
        }}
        onSubmit={(values, { resetForm }) => {
          editIdea({ variables: values });
          resetForm();
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScreenContainer>
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
              title="Save!"
            />
          </ScreenContainer>
        )}
      </Formik>
    </ScreenContainer>
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

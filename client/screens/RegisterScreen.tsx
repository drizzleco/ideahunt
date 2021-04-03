import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import AuthContext from "../navigation/AuthContext";

const FormContainer = styled.View`
  flex-grow: 1;
  max-height: 400px;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const ErrorLabel = styled.Text`
  font-size: 20px;
  color: red;
`;

const Label = styled.Text`
  font-size: 20px;
`;

const RegisterScreen = () => {
  const { signIn } = React.useContext(AuthContext);

  const [register, { loading, error }] = useMutation(RegisterScreen.mutation, {
    onCompleted: async (data) => {
      const accessToken = data.register.accessToken;
      if (accessToken) {
        try {
          await AsyncStorage.setItem("ideaHuntToken", accessToken);
        } catch (e) {
          console.log(e);
        }
        signIn({ userToken: accessToken });
      }
    },
  });

  return (
    <ScreenContainer>
      <Title>Register</Title>
      <Space height={10} width={10} />
      <FormContainer>
        <Formik
          initialValues={{
            username: "",
            name: "",
            email: "",
            password: "",
            confirm: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            register({ variables: values });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit }) => (
            <ScreenContainer>
              <Label>Name</Label>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              <Space height={10} width={0} />
              <Label>Username</Label>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <Space height={10} width={0} />
              <Label>Email</Label>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <Space height={10} width={0} />
              <Label>Password</Label>
              <TextInput
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <Space height={10} width={0} />
              <Label>Confirm Password</Label>
              <TextInput
                secureTextEntry={true}
                onChangeText={handleChange("confirm")}
                onBlur={handleBlur("confirm")}
              />
              <Space height={10} width={0} />
              <Button
                onPress={() => {
                  handleSubmit();
                }}
                title="Sign up!"
              />
              {loading && <Label>Registering you...</Label>}
              {error && <ErrorLabel>{error}</ErrorLabel>}
            </ScreenContainer>
          )}
        </Formik>
      </FormContainer>
    </ScreenContainer>
  );
};

RegisterScreen.mutation = gql`
  mutation RegisterScreen(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
    $confirm: String!
  ) {
    register(
      username: $username
      name: $name
      email: $email
      password: $password
      confirm: $confirm
    ) {
      accessToken
    }
  }
`;

export default RegisterScreen;

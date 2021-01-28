import * as React from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { BACKEND_URL } from "../graphql/Client";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../navigation/AuthContext";

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

interface LoginParams {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);

  const mutation = useMutation(
    (login: LoginParams) => axios.post(BACKEND_URL + "/login", login),
    {
      onSuccess: async ({ data: { accessToken } }) => {
        if (accessToken) {
          try {
            await AsyncStorage.setItem("ideaHuntToken", accessToken);
          } catch (e) {
            console.log(e);
          }
          signIn({ userToken: accessToken });
        }
      },
    }
  );

  return (
    <Container>
      <Title>Login</Title>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Container>
            <Label>Username</Label>
            <Input
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            <Label>Password</Label>
            <Input
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Submit onPress={handleSubmit} title="Submit" />
            {mutation.isLoading ? <Label>Signing you in...</Label> : null}
            {mutation.isError ? (
              <Label>{mutation.error.response.data.message}</Label>
            ) : null}
            {mutation.isSuccess ? (
              <Label>Logged in! To the homepage!!</Label>
            ) : null}
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;

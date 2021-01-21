import * as React from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { BACKEND_URL } from "../graphql/Client";
import axios from "axios";

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

const LoginScreen = () => {
  const navigation = useNavigation();
  const mutation = useMutation(
    (login) =>
      axios.post(BACKEND_URL + "/login", login, { withCredentials: true }),
    {
      onSuccess: async () => {
        navigation.navigate("Root");
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

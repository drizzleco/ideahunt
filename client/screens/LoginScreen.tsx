import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import { useMutation } from "react-query";
import styled from "styled-components/native";

import Button from "../components/Button";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import { BACKEND_URL } from "../graphql/Client";
import AuthContext from "../navigation/AuthContext";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormContainer = styled.View`
  display: flex;
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

interface LoginParams {
  username: string;
  password: string;
}

const LoginScreen = () => {
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
      <Space height={10} width={10} />
      <FormContainer>
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
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <Space height={10} width={0} />
              <Label>Password</Label>
              <TextInput
                autoCapitalize={"none"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={true}
                value={values.password}
              />
              <Space height={10} width={0} />
              <Button
                onPress={() => {
                  handleSubmit();
                }}
                title="Login"
                width={200}
              />
              {mutation.isLoading ? <Label>Signing you in...</Label> : null}
              {mutation.isError ? (
                <ErrorLabel>{mutation.error.response.data.message}</ErrorLabel>
              ) : null}
              {mutation.isSuccess ? (
                <Label>Logged in! To the homepage!!</Label>
              ) : null}
            </Container>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;

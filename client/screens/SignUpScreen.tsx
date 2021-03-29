import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import { useMutation } from "react-query";
import styled from "styled-components/native";

import Button from "../components/Button";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import { BACKEND_URL, HTTP_PROTOCOL } from "../graphql/Client";
import AuthContext from "../navigation/AuthContext";

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

interface RegisterParams {
  username: string;
  password: string;
}

const RegisterScreen = () => {
  const { signIn } = React.useContext(AuthContext);

  const mutation = useMutation(
    (login: RegisterParams) =>
      axios.post(HTTP_PROTOCOL + BACKEND_URL + "/register", login),
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
            mutation.mutate(values);
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
              {mutation.isLoading ? <Label>Registering you...</Label> : null}
              {mutation.isError ? (
                <ErrorLabel>
                  {mutation?.error?.response?.data?.message}
                </ErrorLabel>
              ) : null}
              {mutation.isSuccess ? (
                <Label>Registered! To the homepage!!</Label>
              ) : null}
            </ScreenContainer>
          )}
        </Formik>
      </FormContainer>
    </ScreenContainer>
  );
};

export default RegisterScreen;

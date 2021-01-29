import * as React from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { BACKEND_URL } from "../graphql/Client";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../navigation/AuthContext";
import Space from "../components/Space";

import styled from "styled-components/native";

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

const Input = styled.TextInput`
  border: 1px solid;
  border-radius: 4px;
  height: 30px;
  width: 200px;
`;

const Submit = styled.Button``;

interface RegisterParams {
  username: string;
  password: string;
}

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);

  const mutation = useMutation(
    (login: RegisterParams) => axios.post(BACKEND_URL + "/register", login),
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
            name: "",
            email: "",
            password: "",
            confirm: "",
          }}
          onSubmit={(values) => {
            mutation.mutate(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Container>
              <Label>Name</Label>
              <Input
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              <Space height={10} width={0} />
              <Label>Username</Label>
              <Input
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <Space height={10} width={0} />
              <Label>Email</Label>
              <Input
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <Space height={10} width={0} />
              <Label>Password</Label>
              <Input
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <Space height={10} width={0} />
              <Label>Confirm Password</Label>
              <Input
                onChangeText={handleChange("confirm")}
                onBlur={handleBlur("confirm")}
              />
              <Space height={10} width={0} />
              <Submit
                onPress={() => {
                  handleSubmit();
                }}
                title="Submit"
              />
              {mutation.isLoading ? <Label>Registering you...</Label> : null}
              {mutation.isError ? (
                <ErrorLabel>{mutation.error.response.data.message}</ErrorLabel>
              ) : null}
              {mutation.isSuccess ? (
                <Label>Registered! To the homepage!!</Label>
              ) : null}
            </Container>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;

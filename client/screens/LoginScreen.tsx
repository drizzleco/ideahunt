import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
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

const LoginScreen = () => {
  const { signIn } = React.useContext(AuthContext);
  const [login] = useMutation(LoginScreen.mutation, {
    onCompleted: async (data) => {
      if (data.logIn.error) {
        return; // Skip early in the case of custom 200 error
      }
      const accessToken = data.logIn.accessToken;
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
      <Title>Login</Title>
      <Space height={10} width={10} />
      <FormContainer>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values, { setErrors }) => {
            login({ variables: values }).then((response) => {
              const returnedError = response.data.logIn.error;
              if (response.data.logIn.error) {
                setErrors({ password: returnedError });
              }
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
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
              <Button onPress={handleSubmit} title="Login" width={200} />
              {errors.password ? (
                <ErrorLabel>{errors.password}</ErrorLabel>
              ) : null}
            </View>
          )}
        </Formik>
      </FormContainer>
    </ScreenContainer>
  );
};

LoginScreen.mutation = gql`
  mutation LoginScreen($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      accessToken
      error
    }
  }
`;

export default LoginScreen;

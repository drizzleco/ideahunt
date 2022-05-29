import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const [login, { loading }] = useMutation(LoginScreen.mutation, {
    onCompleted: async (data) => {
      if (data.logIn.error) {
        setError(data.logIn.error);
        return;
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
        <View>
          <Label>Username</Label>
          <TextInput
            autoCapitalize={"none"}
            onChangeText={setUsername}
            value={username}
          />
          <Space height={10} width={0} />
          <Label>Password</Label>
          <TextInput
            autoCapitalize={"none"}
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}
          />
          <Space height={10} width={0} />
          <Button
            onPress={() => {
              login({ variables: { username, password } });
            }}
            title="Login"
            width={200}
          />
          {loading && <Label>Signing you in...</Label>}
          {error && <ErrorLabel> {error} </ErrorLabel>}
        </View>
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

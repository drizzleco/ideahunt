import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import Space from "../components/Space";
import AuthContext from "../navigation/AuthContext";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const { loading, data } = useQuery(ProfileScreen.query);

  if (loading || !data) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <Container>
      <Profile user={data.viewer} />
      <Space height={40} />
      <Button
        title="Log Out"
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("ideaHuntToken");
            signOut();
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </Container>
  );
};

ProfileScreen.query = gql`
  ${Profile.fragment}
  query ProfileScreen {
    viewer {
      ...Profile
    }
  }
`;

export default ProfileScreen;

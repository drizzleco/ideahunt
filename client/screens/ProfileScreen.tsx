import * as React from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import styled from "styled-components/native";

const LogoutButton = styled.Button``;

const logout = () => {};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
};

export default ProfileScreen;

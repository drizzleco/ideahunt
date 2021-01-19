import * as React from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
};

export default ProfileScreen;

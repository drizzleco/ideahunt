import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

import Button from "../components/Button";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import AuthContext from "../navigation/AuthContext";

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const { loading, data } = useQuery(ProfileScreen.query);

  if (loading || !data) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <ScreenContainer>
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
    </ScreenContainer>
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

import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import AuthContext from "../navigation/AuthContext";

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  background-color: #fffff7;
`;

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const { loading, data, refetch } = useQuery(ProfileScreen.query);

  if (loading || !data) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fffff7",
        justifyContent: "center",
      }}
    >
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
        <Space height={10} />

        <IdeasList ideas={data.viewer.ideas} refetch={refetch} />
      </Container>
    </ScrollView>
  );
};

ProfileScreen.query = gql`
  ${Profile.fragment}
  ${IdeasList.fragment}

  query ProfileScreen {
    viewer {
      ...Profile
      ideas {
        id
        ...IdeasList
      }
    }
  }
`;

export default ProfileScreen;

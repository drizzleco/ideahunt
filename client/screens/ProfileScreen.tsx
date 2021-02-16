import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import styled from "styled-components/native";

import AuthContext from "../navigation/AuthContext";
import Loading from "../components/Loading";
import Space from "../components/Space";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled.Button`
  display: flex;
  width: 200px;
  background-color: blue;
  border-radius: 4px;
`;

const ProfilePhoto = styled.View`
  height: 150px;
  width: 150px;
  border-radius: 100px;
  background-color: blue;
`;

const Name = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 24px;
`;

const Username = styled.Text`
  color: gray;
  font-weight: 500;
  font-size: 18px;
`;

const FollowInfo = styled.Text`
  color: black;
  font-weight: 500;
  font-size: 14px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const { loading, data } = useQuery(ProfileScreen.query);

  if (loading || !data) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <Container>
      <ProfilePhoto />
      <Space height={10} />
      <Name>{data.viewer.name}</Name>
      <Username> {`@${data.viewer.username}`} </Username>
      <Space height={10} />
      <RowContainer>
        <FollowInfo>{`${data.viewer.followerCount} Followers`}</FollowInfo>
        <Space width={8} />
        <FollowInfo>{`${data.viewer.followingCount} Following`}</FollowInfo>
      </RowContainer>
      <Space height={40} />
      <LogoutButton
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
  query ProfileScreen {
    viewer {
      id
      name
      username
      followerCount
      followingCount
    }
  }
`;

export default ProfileScreen;

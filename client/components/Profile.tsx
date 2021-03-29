import { gql } from "@apollo/client";
import * as React from "react";
import styled from "styled-components/native";

import Space from "../components/Space";
import { User } from "../types";

import ScreenContainer from "./ScreenContainer";

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

const Profile = ({ user }: { user: User }) => {
  return (
    <ScreenContainer>
      <ProfilePhoto />
      <Space height={10} />
      <Name>{user.name}</Name>
      <Username> {`@${user.username}`} </Username>
      <Space height={10} />
      <RowContainer>
        <FollowInfo>{`${user.followerCount} Followers`}</FollowInfo>
        <Space width={8} />
        <FollowInfo>{`${user.followingCount} Following`}</FollowInfo>
      </RowContainer>
    </ScreenContainer>
  );
};

Profile.fragment = gql`
  fragment Profile on UserModel {
    id
    name
    username
    followerCount
    followingCount
  }
`;

export default Profile;

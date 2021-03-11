import { gql, useQuery, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import styled from "styled-components/native";

import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import Space from "../components/Space";
import AuthContext from "../navigation/AuthContext";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FollowButtonContainer = styled.Button`
  display: flex;
  width: 200px;
  background-color: blue;
  border-radius: 4px;
`;

const FollowButton = ({ followeeId, refetch }: { followeeId: string }) => {
  const [followUser, { data, loading }] = useMutation(FollowButton.mutation);
  return (
    <FollowButtonContainer
      title={"Follow"}
      onPress={() => {
        followUser({ variables: { followeeId } });
        refetch();
      }}
    />
  );
};

FollowButton.mutation = gql`
  mutation FollowUser($followeeId: ID!) {
    createFollow(followeeId: $followeeId) {
      follow {
        userId
        followeeId
      }
    }
  }
`;

const UnfollowButton = ({ followeeId, refetch }: { followeeId: string }) => {
  const [UnfollowUser, { data, loading }] = useMutation(
    UnfollowButton.mutation
  );
  return (
    <FollowButtonContainer
      title={"Unfollow"}
      onPress={() => {
        UnfollowUser({ variables: { followeeId } });
        refetch();
      }}
    />
  );
};

UnfollowButton.mutation = gql`
  mutation UnfollowUser($followeeId: ID!) {
    deleteFollow(followeeId: $followeeId) {
      userId
      followeeId
    }
  }
`;
const LogoutButton = styled.Button`
  display: flex;
  width: 200px;
  background-color: blue;
  border-radius: 4px;
`;

const UserProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const { signOut } = React.useContext(AuthContext);
  const { loading, data, refetch } = useQuery(UserProfileScreen.query, {
    variables: { userId },
  });

  if (loading || !data) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <Container>
      <Profile user={data.user} />
      <Space height={40} />
      {data.user.id !== data.viewer.id &&
        (data.viewer.followsUser ? (
          <UnfollowButton followeeId={data.user.id} refetch={refetch} />
        ) : (
          <FollowButton followeeId={data.user.id} refetch={refetch} />
        ))}
      <IdeasList ideas={data.user.ideas} refetch={refetch} />
      {data.user.id === data.viewer.id && (
        <LogoutButton
          title="Log Out"
          onPress={() => {
            try {
              AsyncStorage.removeItem("ideaHuntToken");
              signOut();
            } catch (e) {
              console.log(e);
            }
          }}
        />
      )}
    </Container>
  );
};

UserProfileScreen.query = gql`
  ${Profile.fragment}
  ${IdeasList.fragment}
  query UserProfileScreen($userId: ID!) {
    viewer {
      ...Profile
      followsUser(userId: $userId)
    }
    user(userId: $userId) {
      id
      ...IdeasList
      ...Profile
    }
  }
`;

export default UserProfileScreen;

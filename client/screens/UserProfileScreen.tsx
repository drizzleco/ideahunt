import { gql, useQuery, useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import * as React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import Space from "../components/Space";
import { SearchParamList } from "../types";

const FollowButton = ({
  followeeId,
  refetch,
}: {
  followeeId: string;
  refetch: () => void;
}) => {
  const [followUser] = useMutation(FollowButton.mutation);
  return (
    <Button
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

const UnfollowButton = ({
  followeeId,
  refetch,
}: {
  followeeId: string;
  refetch: () => void;
}) => {
  const [unfollowUser] = useMutation(UnfollowButton.mutation);
  return (
    <Button
      title={"Unfollow"}
      onPress={() => {
        unfollowUser({ variables: { followeeId } });
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

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  background-color: #fffff7;
`;

type UserProfileScreenProps = RouteProp<SearchParamList, "UserProfileScreen">;
type Props = {
  route: UserProfileScreenProps;
};
const UserProfileScreen = ({ route }: Props) => {
  const { userId } = route.params;
  const { loading, data, refetch } = useQuery(UserProfileScreen.query, {
    variables: { userId },
  });

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
        <Profile user={data.user} />
        {data.user.id !== data.viewer.id &&
          (data.viewer.followsUser ? (
            <UnfollowButton followeeId={data.user.id} refetch={refetch} />
          ) : (
            <FollowButton followeeId={data.user.id} refetch={refetch} />
          ))}
        <Space height={10} />
        <IdeasList ideas={data.user.ideas} />
      </Container>
    </ScrollView>
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
      ideas {
        id
        ...IdeasList
      }
      ...Profile
    }
  }
`;

export default UserProfileScreen;

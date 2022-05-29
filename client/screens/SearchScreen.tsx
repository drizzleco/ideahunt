import { gql, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import * as React from "react";
import { FlatList, ScrollView } from "react-native";
import styled from "styled-components/native";

import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import { User } from "../types";

const Container = styled.View`
  align-items: center;
  background-color: #fffff7;
  flex-direction: row;
  padding: 12px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  border: 1px solid;
  border-radius: 16px;
  background-color: #f7cfcf;
  height: 40px;
  font-size: 16px;
  padding: 4px;
  padding-left: 8px;
  flex-grow: 1;
`;

const ProfileCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: coral;
`;

const ProfileTextContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const UserPreviewContainer = styled.TouchableOpacity`
  border: 1px #888 solid;
  border-radius: 20px;
  background-color: beige;
  min-width: 350px;
  margin-vertical: 2px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const Username = styled.Text``;

const UserPreview = ({ user }: { user: User }) => {
  const navigation = useNavigation();
  return (
    <UserPreviewContainer
      onPress={() =>
        navigation.navigate("UserProfileScreen", { userId: user.id })
      }
    >
      <ProfileCircle />
      <Space width={10} />
      <ProfileTextContainer>
        <Name>{user.name}</Name>
        <Username>{user.username}</Username>
      </ProfileTextContainer>
    </UserPreviewContainer>
  );
};

const PAGE_SIZE = 20;

const SearchUsersScreen = ({ queryString }: { queryString: string }) => {
  const { loading, data, refetch } = useQuery(SearchUsersScreen.query, {
    fetchPolicy: "no-cache",
    variables: { queryString, limit: PAGE_SIZE },
  });

  React.useEffect(() => {
    refetch({ queryString, limit: PAGE_SIZE });
  }, [queryString]);

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }

  if (!data) {
    return (
      <Container
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Title>No users 😢</Title>
      </Container>
    );
  }

  return (
    <ScreenContainer>
      <Space height={10} />
      <FlatList
        data={data.moreUsers.users}
        renderItem={({ item }) => <UserPreview user={item} />}
        keyExtractor={(item: User) => item.id}
      ></FlatList>
    </ScreenContainer>
  );
};

SearchUsersScreen.query = gql`
  query SearchUsersScreen($queryString: String!, $cursor: ID, $limit: Int) {
    moreUsers(queryString: $queryString, cursor: $cursor, limit: $limit) {
      cursor
      users {
        id
        name
        username
      }
    }
  }
`;

const SearchIdeasScreen = ({ queryString }: { queryString: string }) => {
  const { loading, data } = useQuery(SearchIdeasScreen.query, {
    fetchPolicy: "no-cache",
    variables: { queryString, limit: PAGE_SIZE },
  });

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }

  if (!data) {
    return (
      <Container
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Title>No ideas 😢</Title>
      </Container>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Space height={10} />
      <IdeasList ideas={data.moreIdeas.ideas} hideLike />
    </ScrollView>
  );
};

SearchIdeasScreen.query = gql`
  query SearchIdeasScreen($queryString: String!, $cursor: ID, $limit: Int) {
    moreIdeas(queryString: $queryString, cursor: $cursor, limit: $limit) {
      cursor
      ideas {
        id
        ...IdeasList
      }
    }
  }
  ${IdeasList.fragment}
`;

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");

  React.useEffect(
    _.debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 200),
    [searchQuery]
  );

  return (
    <>
      <Container>
        <Input value={searchQuery} onChangeText={setSearchQuery} />
      </Container>
      <Tab.Navigator>
        <Tab.Screen name="Ideas">
          {() => <SearchIdeasScreen queryString={debouncedSearchQuery} />}
        </Tab.Screen>
        <Tab.Screen name="Users">
          {() => <SearchUsersScreen queryString={debouncedSearchQuery} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default SearchScreen;

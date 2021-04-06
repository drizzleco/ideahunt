import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import Loading from "../components/Loading";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import { User } from "../types";

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  border: 1px solid;
  height: 30px;
  width: 100px;
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

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { loading, data, refetch } = useQuery(SearchScreen.query, {
    variables: { query: "", limit: PAGE_SIZE },
  });

  const refetchSearchPosts = React.useCallback(
    _.debounce(
      (text) =>
        refetch({
          query: text,
          limit: PAGE_SIZE,
        }),
      200
    ),
    []
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    refetchSearchPosts(value);
  };

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <ScreenContainer>
      <Title>Search</Title>
      <Input onChange={handleChange} />
      <FlatList
        data={data.moreUsers.users}
        renderItem={({ item }) => <UserPreview user={item} />}
        keyExtractor={(item: User) => item.id}
      ></FlatList>
    </ScreenContainer>
  );
};

SearchScreen.query = gql`
  query SearchScreen($query: String!, $cursor: ID, $limit: Int) {
    moreUsers(query: $query, cursor: $cursor, limit: $limit) {
      cursor
      users {
        id
        name
        username
      }
    }
  }
`;

export default SearchScreen;

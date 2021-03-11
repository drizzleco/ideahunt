import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import Loading from "../components/Loading";
import Space from "../components/Space";
import { User } from "../types";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fffff7;
`;

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

const SearchScreen = () => {
  const { loading, data } = useQuery(SearchScreen.query);
  const [searchQuery, setSearchQuery] = React.useState("");

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <Container>
      <Title>Search</Title>
      <Input onChangeText={setSearchQuery} />
      <FlatList
        data={data.users}
        renderItem={({ item }) => <UserPreview user={item} />}
        keyExtractor={(item: User) => item.id}
      ></FlatList>
    </Container>
  );
};

SearchScreen.query = gql`
  query SearchScreen {
    users {
      id
      name
      username
    }
  }
`;

export default SearchScreen;

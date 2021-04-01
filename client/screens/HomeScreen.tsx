import { gql, useQuery } from "@apollo/client";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  background-color: #fffff7;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

const CreateIdeaButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.navigate("CreateIdeaScreen");
      }}
      title="Add Idea"
    />
  );
};

const HomeScreen = () => {
  const { loading, error, data, refetch } = useQuery(HomeScreen.query);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }
  if (error) {
    console.log(error);
    navigation.navigate("LoginScreen");
    return <Title>error! {error.message}</Title>;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fffff7",
        alignItems: "center",
      }}
    >
      <Space height={30} />
      <CreateIdeaButton />
      <Space height={10} />
      <IdeasList ideas={data.ideas} refetch={refetch} />
    </ScrollView>
  );
};

HomeScreen.query = gql`
  ${IdeasList.fragment}

  query HomeScreen {
    ideas {
      id
      ...IdeasList
    }
  }
`;

export default HomeScreen;

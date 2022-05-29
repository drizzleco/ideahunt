import { gql, useQuery } from "@apollo/client";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { RefreshControl, ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import Space from "../components/Space";

const PAGE_SIZE = 10;

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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    HomeScreen.query,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables: {
        limit: PAGE_SIZE,
      },
    }
  );
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMore({ variables: { limit: PAGE_SIZE, cursor: null } });
    wait(1000).then(() => setRefreshing(false));
  };

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Space height={30} />
      <CreateIdeaButton />
      <Space height={10} />
      <IdeasList
        ideas={data.moreIdeas.ideas}
        onEndReachedThreshold={0.4}
        onEndReached={() =>
          fetchMore({
            variables: { limit: PAGE_SIZE, cursor: data.moreIdeas.cursor },
          })
        }
      />
    </ScrollView>
  );
};

HomeScreen.query = gql`
  ${IdeasList.fragment}

  query HomeScreen($cursor: ID, $limit: Int) {
    moreIdeas(cursor: $cursor, limit: $limit) {
      cursor
      ideas {
        id
        ...IdeasList
      }
    }
  }
`;

export default HomeScreen;

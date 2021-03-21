import { gql, useQuery, useSubscription } from "@apollo/client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import Button from "../components/Button";
import IdeasList from "../components/IdeasList";
import Loading from "../components/Loading";
import Space from "../components/Space";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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

const SecondsCounter = () => {
  const upTo = 10;
  const { data, loading } = useSubscription(SecondsCounter.subscription, {
    variables: { upTo },
  });

  if (loading || !data) {
    return null;
  }
  return <Title>{data.countSeconds}</Title>;
};

SecondsCounter.subscription = gql`
  subscription SecondsCounter($upTo: Int!) {
    countSeconds(upTo: $upTo)
  }
`;

const HomeScreen = () => {
  const { loading, error, data, refetch } = useQuery(HomeScreen.query);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useEffect(() => {
    refetch();
  }, [isFocused]);

  if (loading) {
    return <Loading color={"blue"} size={"large"} />;
  }
  if (error) {
    console.log(error);
    navigation.navigate("LoginScreen");
    return <Title>error! {error.message}</Title>;
  }

  return (
    <Container>
      <Title> Idea Palace</Title>
      <SecondsCounter />
      <Space height={30} />
      <CreateIdeaButton />
      <Space height={10} />
      <IdeasList ideas={data.viewer.ideas} refetch={refetch} />
    </Container>
  );
};

HomeScreen.query = gql`
  ${IdeasList.fragment}

  query HomeScreen {
    viewer {
      id
      ...IdeasList
    }
  }
`;

export default HomeScreen;

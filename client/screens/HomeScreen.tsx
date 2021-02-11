import { gql, useMutation, useQuery } from "@apollo/client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList } from "react-native";
import { Idea, Like } from "../types";
import styled from "styled-components/native";
import Space from "../components/Space";
import Loading from "../components/Loading";
import IdeaLikeItem from "../components/IdeaLikeItem";

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

const IdeaContainer = styled.TouchableOpacity`
  background-color: #faf0e6;
  border-radius: 20px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  min-width: 200px;
`;

const IdeaContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IdeaButton = styled.Button``;

const CreateIdeaButton = () => {
  const navigation = useNavigation();

  return (
    <IdeaButton
      onPress={() => {
        navigation.navigate("CreateIdeaScreen");
      }}
      title="Add Idea"
    />
  );
};

const IdeaItem = ({ idea, refetch }: { idea: Idea; refetch: any }) => {
  const navigation = useNavigation();

  return (
    <>
      <IdeaContent>
        <IdeaLikeItem idea={idea} refetch={refetch} />
        <IdeaContainer
          onPress={() => {
            navigation.navigate("IdeaScreen", { id: idea.id });
          }}
        >
          <Title>{idea.title}</Title>
        </IdeaContainer>
      </IdeaContent>
      <Space height={4} />
    </>
  );
};

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
      <CreateIdeaButton />
      <Title> Hi </Title>
      <FlatList
        data={data.viewer.ideas}
        renderItem={({ item }) => <IdeaItem idea={item} refetch={refetch} />}
        keyExtractor={(item: Idea) => item.id}
      ></FlatList>
    </Container>
  );
};

HomeScreen.query = gql`
  query IdeasList {
    viewer {
      id
      ideas {
        id
        description
        title
        likeCount
        viewerLike {
          id
        }
      }
    }
  }
`;

export default HomeScreen;

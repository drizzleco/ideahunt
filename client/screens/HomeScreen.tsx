import { gql, useMutation, useQuery } from "@apollo/client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Space from "../components/Space";

interface Idea {
  id: string;
  description: string;
  title: string;
  likeCount: number;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const IdeaContainer = styled.TouchableOpacity`
  background-color: #888;
  border-radius: 4px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  min-width: 200px;
`;

const LikeContainer = styled.TouchableOpacity`
  background-color: #d3d3d3;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
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
  const [createLike] = useMutation(IdeaItem.mutation, {
    onCompleted: refetch,
  });

  return (
    <>
      <IdeaContent>
        <LikeContainer
          onPress={() => {
            createLike({ variables: { ideaId: idea.id } });
          }}
        >
          {idea.likeCount}
        </LikeContainer>
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

IdeaItem.mutation = gql`
  mutation IdeaItem_CreateLike($ideaId: ID!) {
    createLike(ideaId: $ideaId) {
      like {
        id
      }
    }
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
    return null;
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
      }
    }
  }
`;

export default HomeScreen;

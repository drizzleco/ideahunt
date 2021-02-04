import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import Space from "../components/Space";
import { HomeScreenParamList } from "../types";

interface Comment {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string };
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const Description = styled.Text`
  color: red;
`;

const RegularButton = styled.Button``;

const EditIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();

  return (
    <RegularButton
      onPress={() => {
        navigation.navigate("EditIdeaScreen", { id });
      }}
      title="Edit Idea"
    />
  );
};

const DeleteIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();
  const [deleteIdea] = useMutation(DeleteIdeaButton.mutation);

  return (
    <RegularButton
      style={{ backgroundColor: "red" }}
      onPress={() => {
        deleteIdea({ variables: { ideaId: id } });
        navigation.navigate("HomeScreen");
      }}
      color={"red"}
      title="Delete"
    />
  );
};

DeleteIdeaButton.mutation = gql`
  mutation DeleteIdea($ideaId: ID!) {
    deleteIdea(ideaId: $ideaId) {
      id
    }
  }
`;

const CommentField = styled.TextInput``;

const NewComment = ({ ideaId, refetch }: { ideaId: string; refetch: any }) => {
  const navigation = useNavigation();
  const [description, setDescription] = React.useState("");
  const [createComment] = useMutation(NewComment.mutation, {
    onCompleted: () => {
      setDescription("");
      refetch();
    },
  });

  return (
    <>
      <CommentField
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <RegularButton
        onPress={() => {
          createComment({ variables: { ideaId, description } });
        }}
        color={"green"}
        title="Comment"
      />
    </>
  );
};

NewComment.mutation = gql`
  mutation createComment($ideaId: ID!, $description: String!) {
    createComment(ideaId: $ideaId, description: $description) {
      comment {
        id
      }
    }
  }
`;

const CommentContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 320px;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid black;
`;

const CommentRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CommentText = styled.Text`
  font-size: 20px;
`;

const AuthorName = styled.Text`
  font-weight: bold;
`;

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <CommentContainer>
      <CommentRow>
        <AuthorName>{comment.author.name}</AuthorName>
        <Space width={10} />
        <Text>{comment.createdAt}</Text>
      </CommentRow>
      <Space height={10} />
      <CommentText>{comment.description}</CommentText>
    </CommentContainer>
  );
};

type IdeaScreenProps = StackScreenProps<HomeScreenParamList, "IdeaScreen">;

const IdeaScreen = ({ route }: IdeaScreenProps) => {
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(IdeaScreen.query, {
    variables: { id },
  });

  if (loading || !data.idea) {
    return null;
  }

  if (error) {
    return <Title>error! {error.message}</Title>;
  }

  return (
    <Container>
      <EditIdeaButton id={data.idea.id} />
      <Title>{data.idea.title}</Title>
      <Description>{data.idea.description}</Description>
      <DeleteIdeaButton id={data.idea.id} />
      <NewComment ideaId={data.idea.id} refetch={refetch} />
      <FlatList
        data={data.idea.comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item: Comment) => item.id}
      ></FlatList>
    </Container>
  );
};

IdeaScreen.query = gql`
  query IdeasScreen($id: ID!) {
    idea(id: $id) {
      id
      description
      title
      createdAt
      updatedAt
      comments {
        id
        description
        createdAt
        updatedAt
        author {
          id
          name
        }
      }
    }
  }
`;

export default IdeaScreen;

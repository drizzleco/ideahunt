import { gql, useQuery, useMutation } from "@apollo/client";
import { faEdit, faTrashAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import _ from "lodash";
import * as React from "react";
import { FlatList, Text, Button, TextInput } from "react-native";
import styled from "styled-components/native";
import { formatDistance } from "date-fns";

import { Idea } from "../types";
import Loading from "../components/Loading";
import Space from "../components/Space";
import CommentLikeItem from "../components/CommentLikeItem";
import { HomeScreenParamList } from "../types";

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

const CommentField = styled.TextInput`
  border: 1px solid black;
  height: 200px;
  width: 200px;
`;

const NewComment = ({ ideaId, refetch }: { ideaId: string; refetch: any }) => {
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
        autoCapitalize={"none"}
        multiline={true}
        numberOfLines={6}
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
  flex-direction: column;
  width: 320px;
  padding: 20px;
  border-radius: 30px;
  border: 1px solid black;
  min-height: 100px;
  margin-bottom: 10px;
`;
const CommentInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CommentRow = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const CommentText = styled.Text`
  font-size: 20px;
`;

const AuthorName = styled.Text`
  font-weight: bold;
`;

const EmptySpace = styled.View`
  display: flex;
  flex: 1;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Icon = ({ icon, onPress }) => {
  return (
    <IconContainer onPress={onPress}>
      <FontAwesomeIcon icon={icon} />
    </IconContainer>
  );
};

const DeleteCommentButton = ({ commentId, refetch }) => {
  const [deleteComment] = useMutation(DeleteCommentButton.mutation, {
    onCompleted: refetch,
  });
  return (
    <Icon
      icon={faTrashAlt}
      onPress={() => {
        deleteComment({ variables: { commentId } });
      }}
    />
  );
};

DeleteCommentButton.mutation = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

const EditContainer = styled.View``;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const EditCommentInput = ({ comment, refetch, setIsEditing }) => {
  const [description, setDescription] = React.useState(comment.description);
  const [editComment] = useMutation(EditCommentInput.mutation, {
    onCompleted: () => {
      refetch();
      setIsEditing(false);
    },
  });
  return (
    <EditContainer>
      <TextInput
        multiline={true}
        numberOfLines={6}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <ButtonWrapper>
        <Button
          color={"gray"}
          title={"Cancel"}
          onPress={() => {
            setIsEditing(false);
          }}
        />
        <Space width={10} />
        <Button
          title={"Save"}
          onPress={() => {
            editComment({ variables: { commentId: comment.id, description } });
          }}
        />
      </ButtonWrapper>
    </EditContainer>
  );
};

EditCommentInput.mutation = gql`
  mutation EditComment($commentId: ID!, $description: String!) {
    editComment(commentId: $commentId, description: $description) {
      comment {
        id
      }
    }
  }
`;

const CommentItem = ({
  comment,
  refetch,
}: {
  comment: Comment;
  refetch: any;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <CommentContainer>
      <CommentRow>
        <CommentInfoContainer>
          <AuthorName>{comment.author.name}</AuthorName>
          <Space width={10} />
          <Text>
            {formatDistance(
              new Date(comment.createdAt),
              Date.now() + new Date().getTimezoneOffset() * 60 * 1000,
              {
                addSuffix: true,
              }
            )}
          </Text>
        </CommentInfoContainer>
        <EmptySpace />
        <CommentInfoContainer>
          <CommentLikeItem comment={comment} refetch={refetch} />
          <Icon icon={faEdit} onPress={() => setIsEditing(!isEditing)} />
          <DeleteCommentButton commentId={comment.id} refetch={refetch} />
        </CommentInfoContainer>
      </CommentRow>
      <Space height={20} />
      {!isEditing ? (
        <CommentText>{comment.description}</CommentText>
      ) : (
        <EditCommentInput
          comment={comment}
          refetch={refetch}
          setIsEditing={setIsEditing}
        />
      )}
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
    return <Loading size={"large"} color={"blue"} />;
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
        data={_.sortBy(data.idea.comments, "createdAt").reverse()}
        renderItem={({ item }) => (
          <CommentItem comment={item} refetch={refetch} />
        )}
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
        likeCount
        viewerLike {
          id
        }
        author {
          id
          name
        }
      }
    }
  }
`;

export default IdeaScreen;

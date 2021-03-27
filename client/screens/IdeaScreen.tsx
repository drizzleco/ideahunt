import { gql, useQuery, useMutation } from "@apollo/client";
import {
  faEdit,
  faPenSquare,
  faToiletPaperSlash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { formatDistance } from "date-fns";
import _ from "lodash";
import * as React from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";

import Button from "../components/Button";
import CommentLikeItem from "../components/CommentLikeItem";
import IconButton from "../components/IconButton";
import Loading from "../components/Loading";
import Row from "../components/Row";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import { Comment, HomeScreenParamList } from "../types";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const Description = styled.Text`
  color: #309430;
  font-size: 30px;
`;

const EditIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();

  return (
    <IconButton
      size={30}
      color={"salmon"}
      onPress={() => {
        navigation.navigate("EditIdeaScreen", { id });
      }}
      icon={faPenSquare}
    />
  );
};

const DeleteIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();
  const [deleteIdea] = useMutation(DeleteIdeaButton.mutation);

  return (
    <IconButton
      onPress={() => {
        deleteIdea({ variables: { ideaId: id } });
        navigation.navigate("HomeScreen");
      }}
      color={"red"}
      size={30}
      icon={faToiletPaperSlash}
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

const NewComment = ({ ideaId, refetch }: { ideaId: string; refetch: any }) => {
  const [description, setDescription] = React.useState("");
  const [showCommentBox, setShowCommentBox] = React.useState(false);
  const [createComment] = useMutation(NewComment.mutation, {
    onCompleted: () => {
      setDescription("");
      refetch();
    },
  });

  return (
    <>
      <Space height={10} />
      {showCommentBox && (
        <>
          <TextInput
            autoCapitalize={"none"}
            multiline={true}
            numberOfLines={6}
            value={description}
            style={{ minHeight: 200 }}
            onChangeText={(text) => setDescription(text)}
          />
          <Space height={10} />
          <Button
            onPress={() => {
              createComment({ variables: { ideaId, description } });
            }}
            style={{ backgroundColor: "rgba(0,180,190,0.9)" }}
            title="Save"
          />
          <Space height={10} />
          <Button
            onPress={() => {
              setShowCommentBox(false);
              setDescription("");
            }}
            style={{ backgroundColor: "rgba(255,0,0,0.9)" }}
            title="Cancel"
          />
        </>
      )}
      {!showCommentBox && (
        <Button
          onPress={() => {
            setShowCommentBox(true);
          }}
          style={{ backgroundColor: "rgba(0,180,190,0.9)" }}
          title="Comment"
        />
      )}
      <Space height={10} />
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
  viewerId,
}: {
  comment: Comment;
  refetch: any;
  viewerId: string;
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
          {viewerId === comment.author.id && (
            <Icon icon={faEdit} onPress={() => setIsEditing(!isEditing)} />
          )}
          {viewerId === comment.author.id && (
            <DeleteCommentButton commentId={comment.id} refetch={refetch} />
          )}
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
      <Title>{data.idea.title}</Title>
      <Description>{data.idea.description}</Description>

      {data.viewer.id === data.idea.author.id && (
        <Row>
          <EditIdeaButton id={data.idea.id} />
          <DeleteIdeaButton id={data.idea.id} />
        </Row>
      )}
      <NewComment ideaId={data.idea.id} refetch={refetch} />
      <FlatList
        data={_.sortBy(data.idea.comments, "createdAt").reverse()}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            refetch={refetch}
            viewerId={data.viewer.id}
          />
        )}
        keyExtractor={(item: Comment) => item.id}
      ></FlatList>
    </Container>
  );
};

IdeaScreen.query = gql`
  query IdeasScreen($id: ID!) {
    viewer {
      id
    }
    idea(id: $id) {
      id
      description
      title
      createdAt
      updatedAt
      author {
        id
        name
      }
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

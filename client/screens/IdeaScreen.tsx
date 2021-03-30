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
import { View } from "react-native";
import { FlatList, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import Button from "../components/Button";
import CommentLikeItem from "../components/CommentLikeItem";
import IconButton from "../components/IconButton";
import IdeaLikeItem from "../components/IdeaLikeItem";
import Line from "../components/Line";
import Loading from "../components/Loading";
import Row from "../components/Row";
import ScreenContainer from "../components/ScreenContainer";
import Space from "../components/Space";
import TextInput from "../components/TextInput";
import useIsMobile from "../hooks/useIsMobile";
import { Comment, HomeScreenParamList } from "../types";

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  background-color: #fffff7;
`;

const Title = styled.Text`
  font-size: 40px;
`;

const Description = styled.Text`
  padding: 12px;
  font-size: 20px;
`;

const IdeaButtonContainer = styled.View`
  background-color: #add8e6;
  border-radius: 10px;
  padding: 2px 10px;
  width: 40px;
  height: 18px;
  justify-content: center;
  align-items: center;
`;

const EditIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();

  return (
    <IdeaButtonContainer>
      <IconButton
        size={14}
        color={"salmon"}
        onPress={() => {
          navigation.navigate("EditIdeaScreen", { id });
        }}
        icon={faPenSquare}
      />
    </IdeaButtonContainer>
  );
};

const DeleteIdeaButton = ({ id }: { id: string }) => {
  const navigation = useNavigation();
  const [deleteIdea] = useMutation(DeleteIdeaButton.mutation);

  return (
    <IdeaButtonContainer>
      <IconButton
        onPress={() => {
          deleteIdea({ variables: { ideaId: id } });
          navigation.navigate("HomeScreen");
        }}
        color={"red"}
        size={14}
        icon={faToiletPaperSlash}
      />
    </IdeaButtonContainer>
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
          <ButtonWrapper>
            <Button
              onPress={() => {
                setShowCommentBox(false);
                setDescription("");
              }}
              style={{ backgroundColor: "rgba(255,0,0,0.9)", flex: 1 }}
              title="Cancel"
            />
            <Button
              onPress={() => {
                createComment({ variables: { ideaId, description } });
                setShowCommentBox(false);
              }}
              style={{ backgroundColor: "rgba(0,180,190,0.9)", flex: 1 }}
              title="Save"
            />
            <Space height={10} />
          </ButtonWrapper>
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
  flex-direction: column;
  padding: 20px;
  border-bottom-color: black;
  border-bottom-width: 1px;
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
  flex-grow: 1;
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

const EditContainer = styled.View`
  width: 100%;
`;

const EditWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

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
      <EditWrapper>
        <TextInput
          multiline={true}
          numberOfLines={6}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </EditWrapper>
      <Space height={4} />
      <ButtonWrapper>
        <Button
          style={{ flex: 1 }}
          color={"gray"}
          title={"Cancel"}
          onPress={() => {
            setIsEditing(false);
          }}
        />
        <Space width={10} />
        <Button
          style={{ flex: 1 }}
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
  const isMobile = useIsMobile();
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
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#fffff7",
        alignItems: "center",
      }}
    >
      <Container style={{ width: isMobile ? "100%" : "60%" }}>
        <Title>{data.idea.title}</Title>
        <AuthorName>{data.idea.author.name}</AuthorName>
        <View style={{ width: "100%" }}>
          <Description>{data.idea.description}</Description>
        </View>
        <Line />
        <Row
          style={{
            width: "100%",
            justifyContent: "space-around",
            marginVertical: 6,
          }}
        >
          <IdeaLikeItem idea={data.idea} refetch={refetch} />
          {data.viewer.id === data.idea.author.id && (
            <>
              <EditIdeaButton id={data.idea.id} />
              <DeleteIdeaButton id={data.idea.id} />
            </>
          )}
        </Row>
        <Line />
        <NewComment ideaId={data.idea.id} refetch={refetch} />
        <Container style={{ width: "100%" }}>
          <FlatList
            style={{ flexGrow: 1, width: "100%" }}
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
      </Container>
    </ScrollView>
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
      likeCount
      viewerLike {
        id
      }
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

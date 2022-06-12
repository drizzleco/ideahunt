import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type CommentModel = {
  __typename?: 'CommentModel';
  author?: Maybe<UserModel>;
  authorId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  idea?: Maybe<IdeaModel>;
  ideaId?: Maybe<Scalars['Int']>;
  likeCount?: Maybe<Scalars['Int']>;
  likes?: Maybe<Array<Maybe<LikeModel>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewerLike?: Maybe<LikeModel>;
};

/** Create Comment mutation */
export type CreateComment = {
  __typename?: 'CreateComment';
  comment?: Maybe<CommentModel>;
};

export type CreateFollow = {
  __typename?: 'CreateFollow';
  follow?: Maybe<FollowModel>;
};

/** Create Idea mutation */
export type CreateIdea = {
  __typename?: 'CreateIdea';
  idea?: Maybe<IdeaModel>;
};

export type CreateLike = {
  __typename?: 'CreateLike';
  commentId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  ideaId?: Maybe<Scalars['ID']>;
};

export type CreateMessage = {
  __typename?: 'CreateMessage';
  message?: Maybe<Scalars['String']>;
};

/** Delete Comment mutation */
export type DeleteComment = {
  __typename?: 'DeleteComment';
  id?: Maybe<Scalars['ID']>;
};

export type DeleteFollow = {
  __typename?: 'DeleteFollow';
  followeeId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};

/** Delete Idea mutation */
export type DeleteIdea = {
  __typename?: 'DeleteIdea';
  id?: Maybe<Scalars['ID']>;
};

export type DeleteLike = {
  __typename?: 'DeleteLike';
  id?: Maybe<Scalars['ID']>;
};

/** Edit Comment mutation */
export type EditComment = {
  __typename?: 'EditComment';
  comment?: Maybe<CommentModel>;
};

/** Edit Idea mutation */
export type EditIdea = {
  __typename?: 'EditIdea';
  idea?: Maybe<IdeaModel>;
};

export type FollowModel = {
  __typename?: 'FollowModel';
  createdAt?: Maybe<Scalars['DateTime']>;
  followeeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['ID'];
};

export type IdeaModel = {
  __typename?: 'IdeaModel';
  author?: Maybe<UserModel>;
  authorId?: Maybe<Scalars['Int']>;
  comments?: Maybe<Array<Maybe<CommentModel>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likeCount?: Maybe<Scalars['Int']>;
  likes?: Maybe<Array<Maybe<LikeModel>>>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  version?: Maybe<Scalars['Int']>;
  viewerLike?: Maybe<LikeModel>;
};

export type IdeasWithCursor = {
  __typename?: 'IdeasWithCursor';
  cursor?: Maybe<Scalars['Int']>;
  ideas?: Maybe<Array<Maybe<IdeaModel>>>;
};

export type LikeModel = {
  __typename?: 'LikeModel';
  author?: Maybe<UserModel>;
  authorId?: Maybe<Scalars['Int']>;
  comment?: Maybe<CommentModel>;
  commentId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  idea?: Maybe<IdeaModel>;
  ideaId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LogIn = {
  __typename?: 'LogIn';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create Comment mutation */
  createComment?: Maybe<CreateComment>;
  createFollow?: Maybe<CreateFollow>;
  /** Create Idea mutation */
  createIdea?: Maybe<CreateIdea>;
  createLike?: Maybe<CreateLike>;
  createMessage?: Maybe<CreateMessage>;
  /** Delete Comment mutation */
  deleteComment?: Maybe<DeleteComment>;
  deleteFollow?: Maybe<DeleteFollow>;
  /** Delete Idea mutation */
  deleteIdea?: Maybe<DeleteIdea>;
  deleteLike?: Maybe<DeleteLike>;
  /** Edit Comment mutation */
  editComment?: Maybe<EditComment>;
  /** Edit Idea mutation */
  editIdea?: Maybe<EditIdea>;
  logIn?: Maybe<LogIn>;
  register?: Maybe<Register>;
};


export type MutationCreateCommentArgs = {
  description: Scalars['String'];
  ideaId: Scalars['ID'];
};


export type MutationCreateFollowArgs = {
  followeeId: Scalars['ID'];
};


export type MutationCreateIdeaArgs = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  version?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateLikeArgs = {
  commentId?: InputMaybe<Scalars['ID']>;
  ideaId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateMessageArgs = {
  word: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationDeleteFollowArgs = {
  followeeId: Scalars['ID'];
};


export type MutationDeleteIdeaArgs = {
  ideaId: Scalars['ID'];
};


export type MutationDeleteLikeArgs = {
  likeId?: InputMaybe<Scalars['ID']>;
};


export type MutationEditCommentArgs = {
  commentId: Scalars['ID'];
  description: Scalars['String'];
};


export type MutationEditIdeaArgs = {
  description?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationLogInArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  confirm: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  idea?: Maybe<IdeaModel>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
  moreIdeas?: Maybe<IdeasWithCursor>;
  moreUsers?: Maybe<UsersWithCursor>;
  user?: Maybe<UserModel>;
  users?: Maybe<Array<Maybe<UserModel>>>;
  viewer?: Maybe<UserModel>;
};


export type QueryIdeaArgs = {
  id: Scalars['ID'];
};


export type QueryMoreIdeasArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  queryString?: InputMaybe<Scalars['String']>;
};


export type QueryMoreUsersArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  queryString: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type Register = {
  __typename?: 'Register';
  accessToken?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  countSeconds?: Maybe<Scalars['Float']>;
  echoMessage?: Maybe<Scalars['String']>;
};


export type SubscriptionCountSecondsArgs = {
  upTo: Scalars['Int'];
};

export type UserModel = {
  __typename?: 'UserModel';
  comments?: Maybe<Array<Maybe<CommentModel>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  followerCount?: Maybe<Scalars['Int']>;
  followers?: Maybe<Array<Maybe<UserModel>>>;
  following?: Maybe<Array<Maybe<UserModel>>>;
  followingCount?: Maybe<Scalars['Int']>;
  followsUser?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  ideas?: Maybe<Array<Maybe<IdeaModel>>>;
  likes?: Maybe<Array<Maybe<LikeModel>>>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};


export type UserModelFollowsUserArgs = {
  userId: Scalars['ID'];
};

export type UsersWithCursor = {
  __typename?: 'UsersWithCursor';
  cursor?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<UserModel>>>;
};

export type CommentLikeItem_CreateLikeMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type CommentLikeItem_CreateLikeMutation = { __typename?: 'Mutation', createLike?: { __typename?: 'CreateLike', id?: string | null, commentId?: string | null } | null };

export type CommentLikeItem_DeleteLikeMutationVariables = Exact<{
  likeId: Scalars['ID'];
}>;


export type CommentLikeItem_DeleteLikeMutation = { __typename?: 'Mutation', deleteLike?: { __typename?: 'DeleteLike', id?: string | null } | null };

export type NewLikeFragment = { __typename?: 'LikeModel', id: string, ideaId?: number | null };

export type LikeItem_CreateLikeMutationVariables = Exact<{
  ideaId: Scalars['ID'];
}>;


export type LikeItem_CreateLikeMutation = { __typename?: 'Mutation', createLike?: { __typename?: 'CreateLike', id?: string | null, ideaId?: string | null } | null };

export type LikeItem_DeleteLikeMutationVariables = Exact<{
  likeId: Scalars['ID'];
}>;


export type LikeItem_DeleteLikeMutation = { __typename?: 'Mutation', deleteLike?: { __typename?: 'DeleteLike', id?: string | null } | null };

export type IdeasListFragment = { __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, likeCount?: number | null, createdAt?: any | null, author?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null };

export type ProfileFragment = { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null, followerCount?: number | null, followingCount?: number | null };

export type EchoMessage_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type EchoMessage_QueryQuery = { __typename?: 'Query', messages?: Array<string | null> | null };

export type EchoMessage_SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EchoMessage_SubscriptionSubscription = { __typename?: 'Subscription', echoMessage?: string | null };

export type CreateMessageMutationVariables = Exact<{
  word: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'CreateMessage', message?: string | null } | null };

export type SecondsCounterSubscriptionVariables = Exact<{
  upTo: Scalars['Int'];
}>;


export type SecondsCounterSubscription = { __typename?: 'Subscription', countSeconds?: number | null };

export type CreateIdeaButtonMutationVariables = Exact<{
  description: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateIdeaButtonMutation = { __typename?: 'Mutation', createIdea?: { __typename?: 'CreateIdea', idea?: { __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null } | null } | null };

export type EditIdeaButtonMutationVariables = Exact<{
  ideaId: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
}>;


export type EditIdeaButtonMutation = { __typename?: 'Mutation', editIdea?: { __typename?: 'EditIdea', idea?: { __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null } | null } | null };

export type HomeScreenQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type HomeScreenQuery = { __typename?: 'Query', moreIdeas?: { __typename?: 'IdeasWithCursor', cursor?: number | null, ideas?: Array<{ __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, likeCount?: number | null, createdAt?: any | null, author?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null } | null> | null } | null };

export type DeleteIdeaMutationVariables = Exact<{
  ideaId: Scalars['ID'];
}>;


export type DeleteIdeaMutation = { __typename?: 'Mutation', deleteIdea?: { __typename?: 'DeleteIdea', id?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  ideaId: Scalars['ID'];
  description: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CreateComment', comment?: { __typename?: 'CommentModel', id: string } | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'DeleteComment', id?: string | null } | null };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  description: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment?: { __typename?: 'EditComment', comment?: { __typename?: 'CommentModel', id: string } | null } | null };

export type IdeasScreenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IdeasScreenQuery = { __typename?: 'Query', viewer?: { __typename?: 'UserModel', id: string } | null, idea?: { __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, createdAt?: any | null, updatedAt?: any | null, likeCount?: number | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null, author?: { __typename?: 'UserModel', id: string, name?: string | null } | null, comments?: Array<{ __typename?: 'CommentModel', id: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, likeCount?: number | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null, author?: { __typename?: 'UserModel', id: string, name?: string | null } | null } | null> | null } | null };

export type LoginScreenMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginScreenMutation = { __typename?: 'Mutation', logIn?: { __typename?: 'LogIn', accessToken?: string | null, error?: string | null } | null };

export type ProfileScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileScreenQuery = { __typename?: 'Query', viewer?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null, followerCount?: number | null, followingCount?: number | null, ideas?: Array<{ __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, likeCount?: number | null, createdAt?: any | null, author?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null } | null> | null } | null };

export type RegisterScreenMutationVariables = Exact<{
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirm: Scalars['String'];
}>;


export type RegisterScreenMutation = { __typename?: 'Mutation', register?: { __typename?: 'Register', accessToken?: string | null } | null };

export type SearchUsersScreenQueryVariables = Exact<{
  queryString: Scalars['String'];
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type SearchUsersScreenQuery = { __typename?: 'Query', moreUsers?: { __typename?: 'UsersWithCursor', cursor?: number | null, users?: Array<{ __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null> | null } | null };

export type SearchIdeasScreenQueryVariables = Exact<{
  queryString: Scalars['String'];
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type SearchIdeasScreenQuery = { __typename?: 'Query', moreIdeas?: { __typename?: 'IdeasWithCursor', cursor?: number | null, ideas?: Array<{ __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, likeCount?: number | null, createdAt?: any | null, author?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null } | null> | null } | null };

export type FollowUserMutationVariables = Exact<{
  followeeId: Scalars['ID'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', createFollow?: { __typename?: 'CreateFollow', follow?: { __typename?: 'FollowModel', userId: string, followeeId: string } | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  followeeId: Scalars['ID'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', deleteFollow?: { __typename?: 'DeleteFollow', userId?: string | null, followeeId?: string | null } | null };

export type UserProfileScreenQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserProfileScreenQuery = { __typename?: 'Query', viewer?: { __typename?: 'UserModel', followsUser?: boolean | null, id: string, name?: string | null, username?: string | null, followerCount?: number | null, followingCount?: number | null } | null, user?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null, followerCount?: number | null, followingCount?: number | null, ideas?: Array<{ __typename?: 'IdeaModel', id: string, description?: string | null, title?: string | null, likeCount?: number | null, createdAt?: any | null, author?: { __typename?: 'UserModel', id: string, name?: string | null, username?: string | null } | null, viewerLike?: { __typename?: 'LikeModel', id: string } | null } | null> | null } | null };

export const NewLikeFragmentDoc = gql`
    fragment NewLike on LikeModel {
  id
  ideaId
}
    `;
export const IdeasListFragmentDoc = gql`
    fragment IdeasList on IdeaModel {
  id
  description
  title
  likeCount
  createdAt
  author {
    id
    name
    username
  }
  viewerLike {
    id
  }
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on UserModel {
  id
  name
  username
  followerCount
  followingCount
}
    `;
export const CommentLikeItem_CreateLikeDocument = gql`
    mutation CommentLikeItem_CreateLike($commentId: ID!) {
  createLike(commentId: $commentId) {
    id
    commentId
  }
}
    `;
export type CommentLikeItem_CreateLikeMutationFn = Apollo.MutationFunction<CommentLikeItem_CreateLikeMutation, CommentLikeItem_CreateLikeMutationVariables>;

/**
 * __useCommentLikeItem_CreateLikeMutation__
 *
 * To run a mutation, you first call `useCommentLikeItem_CreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentLikeItem_CreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentLikeItemCreateLikeMutation, { data, loading, error }] = useCommentLikeItem_CreateLikeMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCommentLikeItem_CreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CommentLikeItem_CreateLikeMutation, CommentLikeItem_CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentLikeItem_CreateLikeMutation, CommentLikeItem_CreateLikeMutationVariables>(CommentLikeItem_CreateLikeDocument, options);
      }
export type CommentLikeItem_CreateLikeMutationHookResult = ReturnType<typeof useCommentLikeItem_CreateLikeMutation>;
export type CommentLikeItem_CreateLikeMutationResult = Apollo.MutationResult<CommentLikeItem_CreateLikeMutation>;
export type CommentLikeItem_CreateLikeMutationOptions = Apollo.BaseMutationOptions<CommentLikeItem_CreateLikeMutation, CommentLikeItem_CreateLikeMutationVariables>;
export const CommentLikeItem_DeleteLikeDocument = gql`
    mutation CommentLikeItem_DeleteLike($likeId: ID!) {
  deleteLike(likeId: $likeId) {
    id
  }
}
    `;
export type CommentLikeItem_DeleteLikeMutationFn = Apollo.MutationFunction<CommentLikeItem_DeleteLikeMutation, CommentLikeItem_DeleteLikeMutationVariables>;

/**
 * __useCommentLikeItem_DeleteLikeMutation__
 *
 * To run a mutation, you first call `useCommentLikeItem_DeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentLikeItem_DeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentLikeItemDeleteLikeMutation, { data, loading, error }] = useCommentLikeItem_DeleteLikeMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *   },
 * });
 */
export function useCommentLikeItem_DeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<CommentLikeItem_DeleteLikeMutation, CommentLikeItem_DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentLikeItem_DeleteLikeMutation, CommentLikeItem_DeleteLikeMutationVariables>(CommentLikeItem_DeleteLikeDocument, options);
      }
export type CommentLikeItem_DeleteLikeMutationHookResult = ReturnType<typeof useCommentLikeItem_DeleteLikeMutation>;
export type CommentLikeItem_DeleteLikeMutationResult = Apollo.MutationResult<CommentLikeItem_DeleteLikeMutation>;
export type CommentLikeItem_DeleteLikeMutationOptions = Apollo.BaseMutationOptions<CommentLikeItem_DeleteLikeMutation, CommentLikeItem_DeleteLikeMutationVariables>;
export const LikeItem_CreateLikeDocument = gql`
    mutation LikeItem_CreateLike($ideaId: ID!) {
  createLike(ideaId: $ideaId) {
    id
    ideaId
  }
}
    `;
export type LikeItem_CreateLikeMutationFn = Apollo.MutationFunction<LikeItem_CreateLikeMutation, LikeItem_CreateLikeMutationVariables>;

/**
 * __useLikeItem_CreateLikeMutation__
 *
 * To run a mutation, you first call `useLikeItem_CreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeItem_CreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeItemCreateLikeMutation, { data, loading, error }] = useLikeItem_CreateLikeMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *   },
 * });
 */
export function useLikeItem_CreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeItem_CreateLikeMutation, LikeItem_CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeItem_CreateLikeMutation, LikeItem_CreateLikeMutationVariables>(LikeItem_CreateLikeDocument, options);
      }
export type LikeItem_CreateLikeMutationHookResult = ReturnType<typeof useLikeItem_CreateLikeMutation>;
export type LikeItem_CreateLikeMutationResult = Apollo.MutationResult<LikeItem_CreateLikeMutation>;
export type LikeItem_CreateLikeMutationOptions = Apollo.BaseMutationOptions<LikeItem_CreateLikeMutation, LikeItem_CreateLikeMutationVariables>;
export const LikeItem_DeleteLikeDocument = gql`
    mutation LikeItem_DeleteLike($likeId: ID!) {
  deleteLike(likeId: $likeId) {
    id
  }
}
    `;
export type LikeItem_DeleteLikeMutationFn = Apollo.MutationFunction<LikeItem_DeleteLikeMutation, LikeItem_DeleteLikeMutationVariables>;

/**
 * __useLikeItem_DeleteLikeMutation__
 *
 * To run a mutation, you first call `useLikeItem_DeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeItem_DeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeItemDeleteLikeMutation, { data, loading, error }] = useLikeItem_DeleteLikeMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *   },
 * });
 */
export function useLikeItem_DeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeItem_DeleteLikeMutation, LikeItem_DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeItem_DeleteLikeMutation, LikeItem_DeleteLikeMutationVariables>(LikeItem_DeleteLikeDocument, options);
      }
export type LikeItem_DeleteLikeMutationHookResult = ReturnType<typeof useLikeItem_DeleteLikeMutation>;
export type LikeItem_DeleteLikeMutationResult = Apollo.MutationResult<LikeItem_DeleteLikeMutation>;
export type LikeItem_DeleteLikeMutationOptions = Apollo.BaseMutationOptions<LikeItem_DeleteLikeMutation, LikeItem_DeleteLikeMutationVariables>;
export const EchoMessage_QueryDocument = gql`
    query EchoMessage_Query {
  messages
}
    `;

/**
 * __useEchoMessage_QueryQuery__
 *
 * To run a query within a React component, call `useEchoMessage_QueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEchoMessage_QueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEchoMessage_QueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useEchoMessage_QueryQuery(baseOptions?: Apollo.QueryHookOptions<EchoMessage_QueryQuery, EchoMessage_QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EchoMessage_QueryQuery, EchoMessage_QueryQueryVariables>(EchoMessage_QueryDocument, options);
      }
export function useEchoMessage_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EchoMessage_QueryQuery, EchoMessage_QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EchoMessage_QueryQuery, EchoMessage_QueryQueryVariables>(EchoMessage_QueryDocument, options);
        }
export type EchoMessage_QueryQueryHookResult = ReturnType<typeof useEchoMessage_QueryQuery>;
export type EchoMessage_QueryLazyQueryHookResult = ReturnType<typeof useEchoMessage_QueryLazyQuery>;
export type EchoMessage_QueryQueryResult = Apollo.QueryResult<EchoMessage_QueryQuery, EchoMessage_QueryQueryVariables>;
export const EchoMessage_SubscriptionDocument = gql`
    subscription EchoMessage_Subscription {
  echoMessage
}
    `;

/**
 * __useEchoMessage_SubscriptionSubscription__
 *
 * To run a query within a React component, call `useEchoMessage_SubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEchoMessage_SubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEchoMessage_SubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useEchoMessage_SubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<EchoMessage_SubscriptionSubscription, EchoMessage_SubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EchoMessage_SubscriptionSubscription, EchoMessage_SubscriptionSubscriptionVariables>(EchoMessage_SubscriptionDocument, options);
      }
export type EchoMessage_SubscriptionSubscriptionHookResult = ReturnType<typeof useEchoMessage_SubscriptionSubscription>;
export type EchoMessage_SubscriptionSubscriptionResult = Apollo.SubscriptionResult<EchoMessage_SubscriptionSubscription>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($word: String!) {
  createMessage(word: $word) {
    message
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      word: // value for 'word'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const SecondsCounterDocument = gql`
    subscription SecondsCounter($upTo: Int!) {
  countSeconds(upTo: $upTo)
}
    `;

/**
 * __useSecondsCounterSubscription__
 *
 * To run a query within a React component, call `useSecondsCounterSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSecondsCounterSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSecondsCounterSubscription({
 *   variables: {
 *      upTo: // value for 'upTo'
 *   },
 * });
 */
export function useSecondsCounterSubscription(baseOptions: Apollo.SubscriptionHookOptions<SecondsCounterSubscription, SecondsCounterSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SecondsCounterSubscription, SecondsCounterSubscriptionVariables>(SecondsCounterDocument, options);
      }
export type SecondsCounterSubscriptionHookResult = ReturnType<typeof useSecondsCounterSubscription>;
export type SecondsCounterSubscriptionResult = Apollo.SubscriptionResult<SecondsCounterSubscription>;
export const CreateIdeaButtonDocument = gql`
    mutation CreateIdeaButton($description: String!, $title: String!) {
  createIdea(description: $description, title: $title) {
    idea {
      id
      description
      title
    }
  }
}
    `;
export type CreateIdeaButtonMutationFn = Apollo.MutationFunction<CreateIdeaButtonMutation, CreateIdeaButtonMutationVariables>;

/**
 * __useCreateIdeaButtonMutation__
 *
 * To run a mutation, you first call `useCreateIdeaButtonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIdeaButtonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIdeaButtonMutation, { data, loading, error }] = useCreateIdeaButtonMutation({
 *   variables: {
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateIdeaButtonMutation(baseOptions?: Apollo.MutationHookOptions<CreateIdeaButtonMutation, CreateIdeaButtonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIdeaButtonMutation, CreateIdeaButtonMutationVariables>(CreateIdeaButtonDocument, options);
      }
export type CreateIdeaButtonMutationHookResult = ReturnType<typeof useCreateIdeaButtonMutation>;
export type CreateIdeaButtonMutationResult = Apollo.MutationResult<CreateIdeaButtonMutation>;
export type CreateIdeaButtonMutationOptions = Apollo.BaseMutationOptions<CreateIdeaButtonMutation, CreateIdeaButtonMutationVariables>;
export const EditIdeaButtonDocument = gql`
    mutation EditIdeaButton($ideaId: ID!, $description: String!, $title: String!) {
  editIdea(ideaId: $ideaId, description: $description, title: $title) {
    idea {
      id
      description
      title
    }
  }
}
    `;
export type EditIdeaButtonMutationFn = Apollo.MutationFunction<EditIdeaButtonMutation, EditIdeaButtonMutationVariables>;

/**
 * __useEditIdeaButtonMutation__
 *
 * To run a mutation, you first call `useEditIdeaButtonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditIdeaButtonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editIdeaButtonMutation, { data, loading, error }] = useEditIdeaButtonMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditIdeaButtonMutation(baseOptions?: Apollo.MutationHookOptions<EditIdeaButtonMutation, EditIdeaButtonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditIdeaButtonMutation, EditIdeaButtonMutationVariables>(EditIdeaButtonDocument, options);
      }
export type EditIdeaButtonMutationHookResult = ReturnType<typeof useEditIdeaButtonMutation>;
export type EditIdeaButtonMutationResult = Apollo.MutationResult<EditIdeaButtonMutation>;
export type EditIdeaButtonMutationOptions = Apollo.BaseMutationOptions<EditIdeaButtonMutation, EditIdeaButtonMutationVariables>;
export const HomeScreenDocument = gql`
    query HomeScreen($cursor: ID, $limit: Int) {
  moreIdeas(cursor: $cursor, limit: $limit) {
    cursor
    ideas {
      id
      ...IdeasList
    }
  }
}
    ${IdeasListFragmentDoc}`;

/**
 * __useHomeScreenQuery__
 *
 * To run a query within a React component, call `useHomeScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeScreenQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useHomeScreenQuery(baseOptions?: Apollo.QueryHookOptions<HomeScreenQuery, HomeScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeScreenQuery, HomeScreenQueryVariables>(HomeScreenDocument, options);
      }
export function useHomeScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeScreenQuery, HomeScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeScreenQuery, HomeScreenQueryVariables>(HomeScreenDocument, options);
        }
export type HomeScreenQueryHookResult = ReturnType<typeof useHomeScreenQuery>;
export type HomeScreenLazyQueryHookResult = ReturnType<typeof useHomeScreenLazyQuery>;
export type HomeScreenQueryResult = Apollo.QueryResult<HomeScreenQuery, HomeScreenQueryVariables>;
export const DeleteIdeaDocument = gql`
    mutation DeleteIdea($ideaId: ID!) {
  deleteIdea(ideaId: $ideaId) {
    id
  }
}
    `;
export type DeleteIdeaMutationFn = Apollo.MutationFunction<DeleteIdeaMutation, DeleteIdeaMutationVariables>;

/**
 * __useDeleteIdeaMutation__
 *
 * To run a mutation, you first call `useDeleteIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIdeaMutation, { data, loading, error }] = useDeleteIdeaMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *   },
 * });
 */
export function useDeleteIdeaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIdeaMutation, DeleteIdeaMutationVariables>(DeleteIdeaDocument, options);
      }
export type DeleteIdeaMutationHookResult = ReturnType<typeof useDeleteIdeaMutation>;
export type DeleteIdeaMutationResult = Apollo.MutationResult<DeleteIdeaMutation>;
export type DeleteIdeaMutationOptions = Apollo.BaseMutationOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($ideaId: ID!, $description: String!) {
  createComment(ideaId: $ideaId, description: $description) {
    comment {
      id
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: ID!, $description: String!) {
  editComment(commentId: $commentId, description: $description) {
    comment {
      id
    }
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const IdeasScreenDocument = gql`
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

/**
 * __useIdeasScreenQuery__
 *
 * To run a query within a React component, call `useIdeasScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdeasScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdeasScreenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIdeasScreenQuery(baseOptions: Apollo.QueryHookOptions<IdeasScreenQuery, IdeasScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IdeasScreenQuery, IdeasScreenQueryVariables>(IdeasScreenDocument, options);
      }
export function useIdeasScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdeasScreenQuery, IdeasScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IdeasScreenQuery, IdeasScreenQueryVariables>(IdeasScreenDocument, options);
        }
export type IdeasScreenQueryHookResult = ReturnType<typeof useIdeasScreenQuery>;
export type IdeasScreenLazyQueryHookResult = ReturnType<typeof useIdeasScreenLazyQuery>;
export type IdeasScreenQueryResult = Apollo.QueryResult<IdeasScreenQuery, IdeasScreenQueryVariables>;
export const LoginScreenDocument = gql`
    mutation LoginScreen($username: String!, $password: String!) {
  logIn(username: $username, password: $password) {
    accessToken
    error
  }
}
    `;
export type LoginScreenMutationFn = Apollo.MutationFunction<LoginScreenMutation, LoginScreenMutationVariables>;

/**
 * __useLoginScreenMutation__
 *
 * To run a mutation, you first call `useLoginScreenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginScreenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginScreenMutation, { data, loading, error }] = useLoginScreenMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginScreenMutation(baseOptions?: Apollo.MutationHookOptions<LoginScreenMutation, LoginScreenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginScreenMutation, LoginScreenMutationVariables>(LoginScreenDocument, options);
      }
export type LoginScreenMutationHookResult = ReturnType<typeof useLoginScreenMutation>;
export type LoginScreenMutationResult = Apollo.MutationResult<LoginScreenMutation>;
export type LoginScreenMutationOptions = Apollo.BaseMutationOptions<LoginScreenMutation, LoginScreenMutationVariables>;
export const ProfileScreenDocument = gql`
    query ProfileScreen {
  viewer {
    ...Profile
    ideas {
      id
      ...IdeasList
    }
  }
}
    ${ProfileFragmentDoc}
${IdeasListFragmentDoc}`;

/**
 * __useProfileScreenQuery__
 *
 * To run a query within a React component, call `useProfileScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileScreenQuery(baseOptions?: Apollo.QueryHookOptions<ProfileScreenQuery, ProfileScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileScreenQuery, ProfileScreenQueryVariables>(ProfileScreenDocument, options);
      }
export function useProfileScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileScreenQuery, ProfileScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileScreenQuery, ProfileScreenQueryVariables>(ProfileScreenDocument, options);
        }
export type ProfileScreenQueryHookResult = ReturnType<typeof useProfileScreenQuery>;
export type ProfileScreenLazyQueryHookResult = ReturnType<typeof useProfileScreenLazyQuery>;
export type ProfileScreenQueryResult = Apollo.QueryResult<ProfileScreenQuery, ProfileScreenQueryVariables>;
export const RegisterScreenDocument = gql`
    mutation RegisterScreen($username: String!, $name: String!, $email: String!, $password: String!, $confirm: String!) {
  register(
    username: $username
    name: $name
    email: $email
    password: $password
    confirm: $confirm
  ) {
    accessToken
  }
}
    `;
export type RegisterScreenMutationFn = Apollo.MutationFunction<RegisterScreenMutation, RegisterScreenMutationVariables>;

/**
 * __useRegisterScreenMutation__
 *
 * To run a mutation, you first call `useRegisterScreenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterScreenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerScreenMutation, { data, loading, error }] = useRegisterScreenMutation({
 *   variables: {
 *      username: // value for 'username'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirm: // value for 'confirm'
 *   },
 * });
 */
export function useRegisterScreenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterScreenMutation, RegisterScreenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterScreenMutation, RegisterScreenMutationVariables>(RegisterScreenDocument, options);
      }
export type RegisterScreenMutationHookResult = ReturnType<typeof useRegisterScreenMutation>;
export type RegisterScreenMutationResult = Apollo.MutationResult<RegisterScreenMutation>;
export type RegisterScreenMutationOptions = Apollo.BaseMutationOptions<RegisterScreenMutation, RegisterScreenMutationVariables>;
export const SearchUsersScreenDocument = gql`
    query SearchUsersScreen($queryString: String!, $cursor: ID, $limit: Int) {
  moreUsers(queryString: $queryString, cursor: $cursor, limit: $limit) {
    cursor
    users {
      id
      name
      username
    }
  }
}
    `;

/**
 * __useSearchUsersScreenQuery__
 *
 * To run a query within a React component, call `useSearchUsersScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersScreenQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUsersScreenQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersScreenQuery, SearchUsersScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersScreenQuery, SearchUsersScreenQueryVariables>(SearchUsersScreenDocument, options);
      }
export function useSearchUsersScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersScreenQuery, SearchUsersScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersScreenQuery, SearchUsersScreenQueryVariables>(SearchUsersScreenDocument, options);
        }
export type SearchUsersScreenQueryHookResult = ReturnType<typeof useSearchUsersScreenQuery>;
export type SearchUsersScreenLazyQueryHookResult = ReturnType<typeof useSearchUsersScreenLazyQuery>;
export type SearchUsersScreenQueryResult = Apollo.QueryResult<SearchUsersScreenQuery, SearchUsersScreenQueryVariables>;
export const SearchIdeasScreenDocument = gql`
    query SearchIdeasScreen($queryString: String!, $cursor: ID, $limit: Int) {
  moreIdeas(queryString: $queryString, cursor: $cursor, limit: $limit) {
    cursor
    ideas {
      id
      ...IdeasList
    }
  }
}
    ${IdeasListFragmentDoc}`;

/**
 * __useSearchIdeasScreenQuery__
 *
 * To run a query within a React component, call `useSearchIdeasScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIdeasScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIdeasScreenQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchIdeasScreenQuery(baseOptions: Apollo.QueryHookOptions<SearchIdeasScreenQuery, SearchIdeasScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIdeasScreenQuery, SearchIdeasScreenQueryVariables>(SearchIdeasScreenDocument, options);
      }
export function useSearchIdeasScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIdeasScreenQuery, SearchIdeasScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIdeasScreenQuery, SearchIdeasScreenQueryVariables>(SearchIdeasScreenDocument, options);
        }
export type SearchIdeasScreenQueryHookResult = ReturnType<typeof useSearchIdeasScreenQuery>;
export type SearchIdeasScreenLazyQueryHookResult = ReturnType<typeof useSearchIdeasScreenLazyQuery>;
export type SearchIdeasScreenQueryResult = Apollo.QueryResult<SearchIdeasScreenQuery, SearchIdeasScreenQueryVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($followeeId: ID!) {
  createFollow(followeeId: $followeeId) {
    follow {
      userId
      followeeId
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      followeeId: // value for 'followeeId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($followeeId: ID!) {
  deleteFollow(followeeId: $followeeId) {
    userId
    followeeId
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      followeeId: // value for 'followeeId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UserProfileScreenDocument = gql`
    query UserProfileScreen($userId: ID!) {
  viewer {
    ...Profile
    followsUser(userId: $userId)
  }
  user(userId: $userId) {
    id
    ideas {
      id
      ...IdeasList
    }
    ...Profile
  }
}
    ${ProfileFragmentDoc}
${IdeasListFragmentDoc}`;

/**
 * __useUserProfileScreenQuery__
 *
 * To run a query within a React component, call `useUserProfileScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileScreenQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfileScreenQuery(baseOptions: Apollo.QueryHookOptions<UserProfileScreenQuery, UserProfileScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileScreenQuery, UserProfileScreenQueryVariables>(UserProfileScreenDocument, options);
      }
export function useUserProfileScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileScreenQuery, UserProfileScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileScreenQuery, UserProfileScreenQueryVariables>(UserProfileScreenDocument, options);
        }
export type UserProfileScreenQueryHookResult = ReturnType<typeof useUserProfileScreenQuery>;
export type UserProfileScreenLazyQueryHookResult = ReturnType<typeof useUserProfileScreenLazyQuery>;
export type UserProfileScreenQueryResult = Apollo.QueryResult<UserProfileScreenQuery, UserProfileScreenQueryVariables>;
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  NewUserScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
  Search: undefined;
};

export type HomeScreenParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  IdeaScreen: { id: string };
  CreateIdeaScreen: undefined;
  EditIdeaScreen: { id: string };
};

export type ChatParamList = {
  ChatScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
  UserProfileScreen: { userId: string };
};

export type AppState = {
  userToken: string | null | undefined;
};

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

interface SignInAction {
  type: typeof SIGN_IN;
  userToken: string | null | undefined;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type AppActionTypes = SignInAction | SignOutAction;

export interface Like {
  id: string;
}

export interface Idea {
  id: string;
  description: string;
  createdAt: Date;
  author: User;
  title: string;
  likeCount: number;
  viewerLike?: Like;
}

export interface Comment {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  author: { id: string; name: string };
  likeCount: number;
  viewerLike: { id: string };
}

export interface User {
  id: string;
  name: string;
  username: string;
  followerCount: number;
  followingCount: number;
}

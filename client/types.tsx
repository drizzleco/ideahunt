export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  NewUserScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type HomeScreenParamList = {
  HomeScreen: undefined;
  IdeaScreen: { id: string };
  CreateIdeaScreen: undefined;
  EditIdeaScreen: { id: string };
};

export type ProfileParamList = {
  ProfileScreen: undefined;
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

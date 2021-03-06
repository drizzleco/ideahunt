import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Loading from "../components/Loading";
import LoginScreen from "../screens/LoginScreen";
import NewUserScreen from "../screens/NewUserScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { RootStackParamList, AppState, AppActionTypes } from "../types";

import AuthContext from "./AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const reducer = (state: AppState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        userToken: action.userToken,
      };
    case "SIGN_OUT":
      return {
        ...state,
        userToken: null,
      };
    default:
      throw new Error("Unknown Action");
  }
};

function RootNavigator() {
  const [state, dispatch] = React.useReducer(reducer, { userToken: null });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const asyncLoadToken = async () => {
      let aToken;
      try {
        aToken = await AsyncStorage.getItem("ideaHuntToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "SIGN_IN", userToken: aToken });
      setLoading(false);
    };
    asyncLoadToken();
  }, []);

  const authContext = {
    signIn: async (data: { userToken: string }) => {
      dispatch({ type: "SIGN_IN", userToken: data.userToken });
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    signUp: async (data: { userToken: string }) => {
      dispatch({ type: "SIGN_IN", userToken: data.userToken });
    },
  };

  if (loading) return <Loading color={"blue"} size={"large"} />;

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.userToken ? (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: "Oops!" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="NewUserScreen"
              component={NewUserScreen}
              options={{ title: "Welcome to ideaHunt!" }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

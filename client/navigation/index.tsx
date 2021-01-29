import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import NewUserScreen from "../screens/NewUserScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegisterScreen from "../screens/SignUpScreen";
import { RootStackParamList, AppState, AppActionTypes } from "../types";

import AuthContext from "./AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
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

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
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

  React.useEffect(() => {
    const asyncLoadToken = async () => {
      let aToken;
      try {
        aToken = await AsyncStorage.getItem("ideaHuntToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "SIGN_IN", userToken: aToken });
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
            <Stack.Screen name="NewUserScreen" component={NewUserScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

import { Ionicons } from "@expo/vector-icons";
import {
  faHome,
  faSearch,
  faComment,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CreateIdeaScreen from "../screens/CreateIdeaScreen";
import EditIdeaScreen from "../screens/EditIdeaScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import IdeaScreen from "../screens/IdeaScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import {
  BottomTabParamList,
  HomeScreenParamList,
  ProfileParamList,
  SearchParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon={faHome} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon={faSearch} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon={faComment} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIcon icon={faUserCircle} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeScreenParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "ideaHunt", title: "Home" }}
      />
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: "Search", title: "Search" }}
      />
      <HomeStack.Screen
        name="IdeaScreen"
        component={IdeaScreen}
        options={{ headerTitle: "idea", title: "Idea" }}
      />
      <HomeStack.Screen
        name="CreateIdeaScreen"
        component={CreateIdeaScreen}
        options={{ headerTitle: "New idea", title: "New Idea" }}
      />
      <HomeStack.Screen
        name="EditIdeaScreen"
        component={EditIdeaScreen}
        options={{ headerTitle: "Edit idea", title: "Edit Idea" }}
      />
    </HomeStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: "Chat", title: "Chat" }}
      />
    </ChatStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile", title: "Profile" }}
      />
    </ProfileStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: "Search", title: "Search" }}
      />
      <HomeStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: "User", title: "Profile" }}
      />
    </SearchStack.Navigator>
  );
}

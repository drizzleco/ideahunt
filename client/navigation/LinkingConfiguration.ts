import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/"), "https://ideahunt.onrender.com"],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
              IdeaScreen: "idea/:id?",
              CreateIdeaScreen: "new-idea",
              EditIdeaScreen: "edit-idea",
            },
          },
          Search: {
            screens: {
              SearchScreen: "search",
              UserProfileScreen: "user/:userId?",
            },
          },
          Chat: {
            screens: {
              ChatScreen: "chat",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
            },
          },
        },
      },
      NewUserScreen: "",
      LoginScreen: "login",
      RegisterScreen: "register",
      NotFound: "*",
    },
  },
};

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
              SearchScreen: "search",
              UserProfileScreen: "user/:userId?",
              IdeaScreen: "idea/:id?",
              CreateIdeaScreen: "new-idea",
              EditIdeaScreen: "edit-idea",
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

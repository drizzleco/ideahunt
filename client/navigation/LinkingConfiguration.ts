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
              IdeaScreen: "idea",
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
      NotFound: "*",
    },
  },
};

import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5050";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: BACKEND_URL + "/graphql",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("ideaHuntToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(link),
});

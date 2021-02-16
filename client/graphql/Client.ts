import {
  createHttpLink,
  from,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { graphql } from "graphql";

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5050"; //"https://drizzle-ideahunt.herokuapp.com";

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message, locations, path }) =>
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // Remove token and reload page. Need a better fix later
    AsyncStorage.removeItem("ideaHuntToken");
    location.reload();
  }
});

export const client = new ApolloClient({
  cache: cache,
  link: from([authLink, errorLink, link]),
});

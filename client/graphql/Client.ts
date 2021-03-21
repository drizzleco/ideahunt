import {
  createHttpLink,
  from,
  ApolloClient,
  split,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5050"; //"https://drizzle-ideahunt.herokuapp.com";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
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

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5050/subscriptions",
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

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
    // AsyncStorage.removeItem("ideaHuntToken");
    // location.reload();
  }
});

export const client = new ApolloClient({
  cache: cache,
  link: from([authLink, errorLink, splitLink]),
});

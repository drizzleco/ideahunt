import {
  createHttpLink,
  from,
  ApolloClient,
  split,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL
    : "localhost:5050";

export const HTTP_PROTOCOL =
  process.env.NODE_ENV === "production" ? "https://" : "http://";

export const WS_PROTOCOL =
  process.env.NODE_ENV === "production" ? "wss://" : "ws://";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        moreIdeas: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming, { args: { cursor = null } }) {
            if (!cursor) return incoming;
            let ideas: Record<string, any>[] = [];
            if (existing && existing.ideas) {
              ideas = ideas.concat(existing.ideas);
            }
            if (incoming && incoming.ideas) {
              ideas = ideas.concat(incoming.ideas);
            }
            return {
              ...incoming,
              ideas,
            };
          },
        },
      },
    },
  },
});
const httpLink = createHttpLink({
  uri: HTTP_PROTOCOL + BACKEND_URL + "/graphql",
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
  uri: WS_PROTOCOL + BACKEND_URL + "/subscriptions",
  options: {
    reconnect: false,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("ideaHuntToken");
      return { token };
    },
  },
});

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

const errorLink = onError((response) => {
  const { graphQLErrors, operation, networkError } = response;
  const { operationName } = operation;
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Operation Name: ${operationName} Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`${operationName} [Network error]: ${networkError}`);
    // Remove token and reload page. Need a better fix later
    // AsyncStorage.removeItem("ideaHuntToken");
    // location.reload();
  }
});

export const client = new ApolloClient({
  cache: cache,
  link: from([authLink, errorLink, splitLink]),
});

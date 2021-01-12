import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:5050/graphql",
});

export const client = new ApolloClient({
  cache: cache,
  link: link,
});

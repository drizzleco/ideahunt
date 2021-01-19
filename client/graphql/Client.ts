import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: process.env.BACKEND_URL || "http://localhost:5050/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  cache: cache,
  link: link,
});

import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5050";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: BACKEND_URL + "/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  cache: cache,
  link: link,
});

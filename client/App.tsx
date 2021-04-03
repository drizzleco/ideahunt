import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "@expo/match-media";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Loading from "./components/Loading";
import { client } from "./graphql/Client";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <Loading color={"blue"} size={"large"} />;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

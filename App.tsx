import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

const client = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={client}>
        <StatusBar 
          style="dark"
          translucent={false}
          />
        <Routes />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

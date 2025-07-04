import React from "react";

import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DestinationScreen from "./screens/DestinationScreen";
import { usePushbaseListeners } from "./lib/src";
import * as Linking from "expo-linking";
import { StatusBar } from "react-native";
import NotificationScreen from "./screens/NotificationScreen";
import { RootStackParamList } from "./types";

const prefix = Linking.createURL("/");
// Configure how your app will handle notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator<RootStackParamList>();

const config = {
  screens: {
    Home: "/", // Define default Home Screen
    Destination: "destinations/:slug",
  },
};
const linking = {
  prefixes: [prefix],
  config,
};

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Destination" component={DestinationScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
  usePushbaseListeners({ enableDeepLinking: true });
  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <MyStack />
      </NavigationContainer>
    </>
  );
}

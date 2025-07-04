import { usePushbaseListeners } from "@/package/src";
import { Stack } from "expo-router";

export default function RootLayout() {
  usePushbaseListeners({ enableDeepLinking: true });
  return <Stack screenOptions={{ headerShown: false }} />;
}

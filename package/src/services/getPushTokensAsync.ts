import { EXPO_PROJECT_ID } from "../constants";

import { PushbasePushTokens } from "../types";
import { validateProjectId, validateDevice } from "../validators";

import * as Notifications from "expo-notifications";

export async function getPushTokensAsync(): Promise<PushbasePushTokens> {
  validateProjectId();
  validateDevice();

  try {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({
      projectId: EXPO_PROJECT_ID,
    });

    const { data: devicePushToken } =
      await Notifications.getDevicePushTokenAsync();

    if (!expoPushToken) {
      throw new Error("Expo push token request failed");
    }

    if (!devicePushToken) {
      throw new Error("Device push token request failed");
    }

    return { devicePushToken, expoPushToken };
  } catch (error) {
    console.error("getPushTokensAsync error:", error);
    throw error;
  }
}

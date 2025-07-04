import { getPermissionsAsync } from "expo-notifications";
import { validateApiKey, validateProjectId } from "../validators";
import { getPushTokensAsync } from "../services/getPushTokensAsync";
import { PushbaseNotification } from "../types";
import { API_ROUTES, HTTPMethod, PUSHBASE_API } from "../constants";
import saveLocalNotifications from "../services/saveLocalNotifications";
import { objectToUrlSearchString } from "../utils";

export async function getNotifications(options: {
  lookbackDays?: number;
}): Promise<PushbaseNotification[]> {
  try {
    validateApiKey();
    validateProjectId();

    const hasPermission = await getPermissionsAsync();
    if (!hasPermission) {
      throw new Error(
        "Notification permission required to identify current push token"
      );
    }

    const pushTokens = await getPushTokensAsync();

    const params = {
      push_token: pushTokens.expoPushToken,
      lookback_days: options?.lookbackDays ?? 7, // Default to 7 days when not provided
    };

    const searchParams = objectToUrlSearchString(params);

    let url = `${PUSHBASE_API}${API_ROUTES.GET_DEVICE_NOTIFICATIONS}?${searchParams}`;

    const response = await fetch(url, {
      method: HTTPMethod.GET,
      headers: {
        "Content-Type": "application/json",
      },

      redirect: "follow",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Could'n not fetch notifications:",
        response.status,
        result
      );
      throw new Error("Could'n fetch notifications");
    }

    if (Array.isArray(result)) {
      saveLocalNotifications(result ?? []);
    }

    return result;
  } catch (error) {
    console.error(" fetch notifications error:", error);
    throw error;
  }
}

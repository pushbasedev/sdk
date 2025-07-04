import { getPermissionsAsync } from "expo-notifications";
import { validateApiKey, validateProjectId } from "../validators";
import { getPushTokensAsync } from "../services/getPushTokensAsync";
import { convertKeysToSnakeCase } from "../utils";
import { API_ROUTES, HTTPMethod, PUSHBASE_API } from "../constants";
import clearLocalCache from "../services/clearLocalCache";

export async function unsubscribeToNotifications(): Promise<{
  message: string;
}> {
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

    const response = await fetch(
      `${PUSHBASE_API}${API_ROUTES.UNSUBSCRIBE_TO_NOTIFICATIONS}`,
      {
        method: HTTPMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertKeysToSnakeCase(pushTokens)),
        redirect: "follow",
      }
    );

    const result = await response.json();

    if (!response.ok && response.status !== 404) {
      console.error("Unsubscribe failed:", response.status, result);
      throw new Error("We could not unsubscribe");
    }

    // Clear local cached data
    await clearLocalCache();

    return result;
  } catch (error) {
    console.error("unsubscribeToNotifications error:", error);
    throw error;
  }
}

import { API_ROUTES, HTTPMethod, PUSHBASE_API } from "../constants";
import getLocalSubscription from "../services/getLocalSubscription";
import { getPermissionsAsync } from "../services/getPermissionAsync";
import { getPushTokensAsync } from "../services/getPushTokensAsync";
import { convertKeysToSnakeCase } from "../utils";
import { validateApiKey, validateProjectId } from "../validators";

export async function isSubscribedToNotifications(): Promise<boolean> {
  try {
    validateApiKey();
    validateProjectId();
    const hasPermission = await getPermissionsAsync();
    if (!hasPermission) return false;

    // Check cached subscription
    const localSubscription = await getLocalSubscription();
    if (localSubscription !== null) return true;

    const pushTokens = await getPushTokensAsync();
    const response = await fetch(
      `${PUSHBASE_API}${API_ROUTES.IS_SUBSCRIBED_TO_NOTIFICATIONS}`,
      {
        method: HTTPMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertKeysToSnakeCase(pushTokens)),
        redirect: "follow",
      }
    );

    if (!response.ok) {
      console.error("Subscription check failed:", response.statusText);
      return false;
    }

    const result = await response.json();
    return result?.subscribed ?? false;
  } catch (error) {
    console.error("Failed to check subscription:", error);
    return false;
  }
}

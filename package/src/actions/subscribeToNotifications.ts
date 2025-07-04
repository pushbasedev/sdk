import { getPermissionsAsync } from "expo-notifications";
import { getPushTokensAsync } from "../services/getPushTokensAsync";
import { getLocation } from "../services/getLocation";
import { getDeviceMetadata } from "../services/getDeviceMetadata";
import { convertKeysToSnakeCase, isValidNonEmptyObject } from "../utils";
import { PushbaseCreateDevice, PushbaseExternalIdentity } from "../types";
import { getApp } from "../services/getApp";
import { validateApiKey, validateProjectId } from "../validators";
import { createDevice } from "../services/createDevice";
import saveLocalSubscription from "../services/saveLocalSubscription";

type SubscriptionOptions = {
  user?: PushbaseExternalIdentity;
};

export async function subscribeToNotifications(options?: SubscriptionOptions) {
  try {
    validateApiKey();
    validateProjectId();

    const hasGrantedPermission = await getPermissionsAsync();
    if (!hasGrantedPermission) return;

    const pushTokens = await getPushTokensAsync();
    const location = await getLocation();
    const app = await getApp();
    const device = getDeviceMetadata();

    const subscription = {
      ...device,
      ...location,
      ...pushTokens,
      ...normalizeExternalIdentity(options?.user),
    };

    const payload: PushbaseCreateDevice = {
      app_id: app.id,
      ...convertKeysToSnakeCase(subscription),
    };

    await createDevice(payload);
    await saveLocalSubscription(payload);

    return subscription;
  } catch (error) {
    console.error("Failed to subscribe to notifications:", error);
    throw error;
  }
}

function normalizeExternalIdentity(user?: PushbaseExternalIdentity) {
  if (!isValidNonEmptyObject(user)) return {};

  return {
    external_id: user?.id ?? null,
    external_name: user?.name ?? null,
    external_email: user?.email ?? null,
    external_phone: user?.phone ?? null,
  };
}

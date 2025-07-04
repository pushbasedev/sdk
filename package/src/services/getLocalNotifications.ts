import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { PushbaseNotification } from "../types";
import { getLocalStorageValueFor } from "./local-storage";

export default async function getLocalNotifications() {
  const result: {
    notifications: PushbaseNotification[] | null;
    notificationsCacheTime: string | null;
  } = {
    notifications: null,
    notificationsCacheTime: null,
  };

  try {
    const notificationsResult = await getLocalStorageValueFor(
      PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATIONS
    );

    const notificationsCacheTime = await getLocalStorageValueFor(
      PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATIONS_CACHE_TIME
    );

    if (notificationsResult !== null && notificationsCacheTime !== null) {
      const notifications = JSON.parse(notificationsResult);

      if (Array.isArray(notifications)) {
        result["notifications"] = notifications;
      }

      if (notificationsCacheTime !== null) {
        result["notificationsCacheTime"] = notificationsCacheTime;
      }
    }

    return result;
  } catch (error) {
    return result;
  }
}

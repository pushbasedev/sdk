import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { PushbaseNotification } from "../types";

import { saveToLocalStorage } from "./local-storage";

export default async function saveLocalNotifications(
  notifications: PushbaseNotification[]
) {
  await saveToLocalStorage(
    PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATIONS,
    JSON.stringify(notifications)
  );

  const time = new Date().toISOString();

  await saveToLocalStorage(
    PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATIONS_CACHE_TIME,
    String(time)
  );
}

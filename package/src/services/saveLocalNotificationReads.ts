import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { NotificationReads } from "../types";
import getLocalNotificationReads from "./getLocalNotificationReads";

import { saveToLocalStorage } from "./local-storage";

export default async function saveLocalNotificationReads(
  notificationId: string
): Promise<NotificationReads> {
  const previousNotificationReads = await getLocalNotificationReads();

  const newNotificationReads =
    previousNotificationReads === null
      ? { [notificationId]: true }
      : { ...previousNotificationReads, [notificationId]: true };

  await saveToLocalStorage(
    PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATION_READS,
    JSON.stringify(newNotificationReads)
  );

  return newNotificationReads;
}

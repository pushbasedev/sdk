import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { NotificationReads } from "../types";
import { getLocalStorageValueFor } from "./local-storage";

export default async function getLocalNotificationReads(): Promise<NotificationReads | null> {
  const result = await getLocalStorageValueFor(
    PUSHBASE_LOCAL_STORAGE_KEYS.NOTIFICATION_READS
  );

  if (result === null) return null;

  try {
    return JSON.parse(result);
  } catch (error) {
    return null;
  }
}

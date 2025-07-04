import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";

import { saveToLocalStorage } from "./local-storage";

export default async function saveLastSubscriptionRetryTime() {
  const time = new Date().toISOString();
  console.log({ time });
  await saveToLocalStorage(
    PUSHBASE_LOCAL_STORAGE_KEYS.LAST_SUBSCRIPTION_RETRY_TIME,
    String(time)
  );
}

import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";

import { getLocalStorageValueFor } from "./local-storage";

export default async function getLastSubscriptionRetryTime(): Promise<
  string | null
> {
  const result = await getLocalStorageValueFor(
    PUSHBASE_LOCAL_STORAGE_KEYS.LAST_SUBSCRIPTION_RETRY_TIME
  );

  if (result === null) return null;

  return result;
}

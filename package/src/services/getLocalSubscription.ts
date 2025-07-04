import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { PushbaseCreateDevice } from "../types";
import { getLocalStorageValueFor } from "./local-storage";

export default async function getLocalSubscription(): Promise<PushbaseCreateDevice | null> {
  const result = await getLocalStorageValueFor(
    PUSHBASE_LOCAL_STORAGE_KEYS.DEVICE_SUBSCRIPTION
  );

  if (result === null) return null;

  try {
    return JSON.parse(result);
  } catch (error) {
    return null;
  }
}

import { deleteItemAsync } from "expo-secure-store";
import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";

export default async function deleteLastSubscriptionRetryTime() {
  return deleteItemAsync(
    PUSHBASE_LOCAL_STORAGE_KEYS.LAST_SUBSCRIPTION_RETRY_TIME
  );
}

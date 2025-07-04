import { deleteItemAsync } from "expo-secure-store";
import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";

export default async function deleteLocalSubscription() {
  return deleteItemAsync(PUSHBASE_LOCAL_STORAGE_KEYS.DEVICE_SUBSCRIPTION);
}

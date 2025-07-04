import { PUSHBASE_LOCAL_STORAGE_KEYS } from "../constants";
import { PushbaseCreateDevice } from "../types";
import { saveToLocalStorage } from "./local-storage";

export default function saveLocalSubscription(device: PushbaseCreateDevice) {
  return saveToLocalStorage(
    PUSHBASE_LOCAL_STORAGE_KEYS.DEVICE_SUBSCRIPTION,
    JSON.stringify(device)
  );
}

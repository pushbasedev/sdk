import * as Device from "expo-device";
import {
  throwAppIdUnavailable,
  throwInvalidApiKey,
  throwProjectIdUnavailable,
  throwOnlyDeviceSupported,
} from "../errors";
import { isUUID } from "../utils";
import { EXPO_PROJECT_ID, PUSHBASE_APP_INTEGRATION_ID } from "../constants";

export function validateApiKey() {
  if (!PUSHBASE_APP_INTEGRATION_ID) {
    return throwAppIdUnavailable();
  }
  if (
    typeof PUSHBASE_APP_INTEGRATION_ID !== "string" ||
    !isUUID(PUSHBASE_APP_INTEGRATION_ID)
  )
    return throwInvalidApiKey();
}

export function validateProjectId() {
  if (!EXPO_PROJECT_ID) return throwProjectIdUnavailable();
}

export function validateDevice() {
  if (!Device.isDevice) return throwOnlyDeviceSupported();
}

import * as Constants from "expo-constants";
import { generateLocalStorageKey } from "../utils";

export const PUSHBASE_API = "https://api.pushbase.dev";

export const API_ROUTES = {
  DEVICES: "/devices",
  APP_BY_KEY: "/apps/app-by-integration-id",
  IS_SUBSCRIBED_TO_NOTIFICATIONS: "/devices/is-subscribed-to-notifications",
  UNSUBSCRIBE_TO_NOTIFICATIONS: "/devices/unsubscribed-to-notifications",
  UPDATE_NOTIFICATION_COUNT: "/broadcasts/update-delivery-report",
  GET_DEVICE_NOTIFICATIONS: "/broadcasts/device",
};

export const PUSHBASE_APP_INTEGRATION_ID =
  Constants.default.expoConfig?.extra?.pushbaseAppId;

export const EXPO_PROJECT_ID =
  Constants.default.expoConfig?.extra?.eas?.projectId;

export const LOCATION_API = "https://ipinfo.io/geo";

export enum HTTPMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export const PUSHBASE_LOCAL_STORAGE_KEYS = {
  DEVICE_SUBSCRIPTION: generateLocalStorageKey("device_subscription"),
  NOTIFICATION_READS: generateLocalStorageKey("notifications_reads"),
  NOTIFICATIONS: generateLocalStorageKey("notifications"),
  NOTIFICATIONS_CACHE_TIME: generateLocalStorageKey("notifications_cache_time"),
  LAST_SUBSCRIPTION_RETRY_TIME: generateLocalStorageKey(
    "last_subscription_retry_time"
  ),
};
export const PUSHBASE_NETWORK_DATA_CACHE_STALE_TIME = 5; // 5 minutes

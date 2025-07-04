import * as Constants from "expo-constants";
import { PUSHBASE_NETWORK_DATA_CACHE_STALE_TIME } from "../constants";

export const isObject = (value: any) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const compactObject = (val: Object) => {
  const data: Record<string, any> = Array.isArray(val)
    ? val.filter(Boolean)
    : val;
  return Object.keys(data).reduce(
    (acc: Record<string, any>, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === "object" ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};
type UUIDVersion = "1" | "2" | "3" | "4" | "5" | "all";

export function isUUID(str: string, version: UUIDVersion = "all"): boolean {
  const uuid: Record<UUIDVersion, RegExp> = {
    "1": /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    "2": /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    "3": /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    "4": /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    "5": /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  };

  const pattern = uuid[version];
  return pattern.test(str);
}

export function v4() {
  var IDX = 256,
    HEX = [],
    BUFFER;
  while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

  var i = 0,
    num,
    out = "";

  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array((i = 256));
    while (i--) BUFFER[i] = (256 * Math.random()) | 0;
    i = IDX = 0;
  }

  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6) out += HEX[(num & 15) | 64];
    else if (i == 8) out += HEX[(num & 63) | 128];
    else out += HEX[num];

    if (i & 1 && i > 1 && i < 11) out += "-";
  }

  IDX++;
  return out;
}

/**
 * Converts a camelCase string to snake_case
 * @param str The camelCase string to convert
 * @returns The string in snake_case format
 */
function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Recursively converts all keys in an object from camelCase to snake_case
 * @param obj The object containing camelCase keys
 * @returns A new object with all keys converted to snake_case
 */
export function convertKeysToSnakeCase<T>(obj: T): any {
  // Handle null or undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle primitive types
  if (typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToSnakeCase(item));
  }

  // Handle objects
  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Convert key to snake_case
    const snakeKey = camelToSnakeCase(key);

    // Recursively convert nested objects
    result[snakeKey] = convertKeysToSnakeCase(value);
  });

  return result;
}

export function isValidNonEmptyObject(value: unknown) {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (Object.keys(value).length === 0) {
    return false;
  }

  return true;
}

export function getAppScheme() {
  return Constants.default.expoConfig?.scheme;
}

/**
 * Validates if a given string is a valid URL with additional protocol checks
 * @param url - The URL string to validate
 * @param allowedProtocols - Array of allowed protocols (default: ['http:', 'https:'])
 * @returns boolean - true if valid URL with allowed protocol, false otherwise
 */
export function isValidUrlWithProtocol(
  url: string,
  allowedProtocols: string[] = ["http:", "https:"]
): boolean {
  try {
    const parsedUrl = new URL(url);
    return allowedProtocols.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

export function getRelativeTime(isoDate: string): string {
  const now = new Date();
  const past = new Date(isoDate);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365); // Approximate

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  if (weeks < 5) return `${weeks}w`;
  if (months < 12) return `${months}mo`;
  return `${years}y`;
}

export function generateLocalStorageKey(key: string) {
  const base = "pushbase_local_storage_key_";

  return base + key;
}

export function getDifferenceInMinutes(
  date1ISO: string,
  date2ISO: string
): number {
  const date1 = new Date(date1ISO);
  const date2 = new Date(date2ISO);

  // Check for invalid dates
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  const diffMs = Math.abs(date1.getTime() - date2.getTime());
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return diffMinutes;
}

export function isCachedNetworkDataExpired(cacheTime: string) {
  const now = new Date().toISOString();
  const elapsedTimeInMinutes = getDifferenceInMinutes(now, cacheTime);

  return elapsedTimeInMinutes >= PUSHBASE_NETWORK_DATA_CACHE_STALE_TIME;
}

/**
 * Transforms an object into a URL search string (query string)
 * @param obj - The object to transform into a URL search string
 * @returns A URL-encoded search string
 */
export function objectToUrlSearchString(obj: Record<string, unknown>): string {
  // Return empty string for null or undefined
  if (obj === null || obj === undefined) {
    return "";
  }

  // Get all key-value pairs, encode them properly, and join with &
  return Object.entries(obj)
    .map(([key, value]) => {
      // Skip null or undefined values
      if (value === null || value === undefined) {
        return null;
      }

      // Handle arrays by creating multiple parameters with the same name
      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          )
          .join("&");
      }

      // Handle objects with nested properties
      if (typeof value === "object") {
        return Object.entries(value)
          .map(
            ([nestedKey, nestedValue]) =>
              `${encodeURIComponent(key)}[${encodeURIComponent(
                nestedKey
              )}]=${encodeURIComponent(nestedValue)}`
          )
          .join("&");
      }

      // Handle simple key-value pairs
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .filter((param): param is string => param !== null) // Remove null entries with type guard
    .join("&")
    .replace(/%20/g, "+"); // Replace spaces with +
}

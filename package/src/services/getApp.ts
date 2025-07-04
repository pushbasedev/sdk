import {
  PUSHBASE_API,
  API_ROUTES,
  HTTPMethod,
  PUSHBASE_APP_INTEGRATION_ID,
} from "../constants";
import { PushbaseApp } from "../types";

export async function getApp(): Promise<PushbaseApp> {
  try {
    const url = `${PUSHBASE_API}${API_ROUTES.APP_BY_KEY}?app_integration_id=${PUSHBASE_APP_INTEGRATION_ID}`;

    const response = await fetch(url, {
      method: HTTPMethod.GET,
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("getApp failed:", result);
      throw new Error(result?.message || "Failed to fetch app");
    }

    return result;
  } catch (error) {
    console.error("getApp error:", error);
    throw error;
  }
}

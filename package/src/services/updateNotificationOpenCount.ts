import { API_ROUTES, HTTPMethod, PUSHBASE_API } from "../constants";
import { PushbaseDevice } from "../types";

/** Increment notification count by one  */
export default async function incrementNotificationOpenCount(
  notificationId: number
): Promise<PushbaseDevice> {
  try {
    const body = {
      id: notificationId,
      stats: {
        opened_count: 1,
      },
    };

    const response = await fetch(
      `${PUSHBASE_API}${API_ROUTES.UPDATE_NOTIFICATION_COUNT}`,
      {
        method: HTTPMethod.PATCH,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        redirect: "follow",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to increment notification open count:", result);
      throw new Error(result?.message || "Failed to update notification count");
    }

    return result;
  } catch (error) {
    console.error("incrementNotificationOpenCount error:", error);
    throw error;
  }
}

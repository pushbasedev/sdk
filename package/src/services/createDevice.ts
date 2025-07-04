import { PUSHBASE_API, API_ROUTES, HTTPMethod } from "../constants";
import { PushbaseCreateDevice, PushbaseDevice } from "../types";

export async function createDevice(
  device: PushbaseCreateDevice
): Promise<PushbaseDevice> {
  try {
    const response = await fetch(`${PUSHBASE_API}${API_ROUTES.DEVICES}`, {
      method: HTTPMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
      redirect: "follow",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Device creation failed:", result);
      throw new Error(result?.message || "Failed to create device");
    }

    return result;
  } catch (error) {
    console.error("createDevice error:", error);
    throw error;
  }
}

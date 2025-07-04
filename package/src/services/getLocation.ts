import { LOCATION_API } from "../constants";
import { PushbaseLocation } from "../types";

export async function getLocation(): Promise<PushbaseLocation> {
  try {
    const response = await fetch(LOCATION_API);

    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }

    const result = await response.json();

    const [latitude, longitude] = result.loc?.split(",") ?? [];

    if (!latitude || !longitude) {
      throw new Error("Invalid location coordinates");
    }

    const location: PushbaseLocation = {
      country: result.country,
      region: result.region,
      city: result.city,
      latitude,
      longitude,
      timezone: result.timezone,
    };

    return location;
  } catch (error) {
    console.error("getLocation error:", error);
    throw error;
  }
}

import destinations from "@/datasets/destinations";
import properties from "@/datasets/properties";

export function getAllProperties() {
  return Object.values(properties).flat();
}

export function getAllDestinations() {
  return destinations;
}

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getPropertiesByDestination(slug: string) {
  return properties[slug] ?? [];
}

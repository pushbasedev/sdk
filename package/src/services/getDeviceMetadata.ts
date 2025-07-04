import { Platform } from "react-native";
import * as Device from "expo-device";
import { PushbaseDeviceMetadata } from "../types";
import { getLocales } from "expo-localization";

export function getDeviceMetadata() {
  const locales = getLocales();

  const locale = Array.isArray(locales) ? locales[0] : null;

  const language = locale?.languageCode ? locale.languageCode : "en";
  const metadata: PushbaseDeviceMetadata = {
    platform: Platform.OS,
    manufacturer: Device.manufacturer,
    model: Device.modelName,
    brand: Device.brand,
    osName: Device.osName,
    osVersion: Device.osVersion,
    language: language.toUpperCase(),
  };
  return metadata;
}

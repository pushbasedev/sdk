export type PushbasePushTokens = {
  expoPushToken: string;
  devicePushToken: string;
};

export type PushbaseDeviceMetadata = {
  platform: string;
  manufacturer: string | null;
  model: string | null;
  brand: string | null;
  osName: string | null;
  osVersion: string | null;
  language: string | null;
};

export type PushbaseExternalIdentity = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export type PushBaseRequestResponse<T> = {
  error: string | null;
  data: Partial<T> | null;
  code?: number;
};

export type PushbaseLocation = {
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

export type PushbaseApp = {
  id: number;
  app_integration_id: string;
  name: string;
  slug: string;
  color: string;
};

export type PushbaseCreateDevice = {
  app_id: number;
  brand: string;
  city: string;
  country: string;
  device_push_token: string;
  expo_push_token: string;
  external_email: string;
  external_id: any;
  external_name: string;
  external_phone: any;
  latitude: string;
  longitude: string;
  manufacturer: string;
  model: string;
  os_name: string;
  os_version: string;
  platform: string;
  region: string;
  timezone: string;
};

export type PushbaseDevice = {
  app_id: number;
  platform: string;
  manufacturer: string;
  model: string;
  brand: string;
  os_name: string;
  os_version: string;
  language: string;
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  timezone: string;
  device_push_token: string;
  expo_push_token: string;
  external_id: string | null;
  external_name: string | null;
  external_email: string | null;
  external_phone: string | null;
  id: number;
  created_at: string;
  updated_at: string;
  is_tester: boolean;
  is_active: boolean;
};

export interface PushbaseNotification {
  id: string;
  title: string;
  body: string;
  url: string;
  pushed_at: string;
}

export type NotificationReads = Record<string, number | string | boolean>;

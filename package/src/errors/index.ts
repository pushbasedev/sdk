export function warn(errorMessage: string) {
  if (__DEV__) {
    throw new Error(errorMessage);
  }

  return;
}

export function throwAppIdUnavailable() {
  return warn(
    `The API key is not provided. 
     
         1. Create new app inside dashboard to get a new API key.
         2. Copy API key from Pushbase dashboard.
         3. Inside Expo project, under  app.json file, add extra.apiKey and paste the API key value.`
  );
}

export function throwInvalidApiKey() {
  return warn(
    "The API key is not existed or invalid. Copy API key from the PushBase dashboard."
  );
}

export function throwProjectIdUnavailable() {
  return warn(
    `The EAS project ID is required to push notification when using Expo Go. 
     
     Configure your project with Expo EAS Build by run: eas build:configure
     
     Learn more about projectId https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid`
  );
}

export function throwPermissionNotGranted() {
  return warn(
    "Notification permission not granted. Request notification permission first before call this function."
  );
}

export function throwOnlyDeviceSupported() {
  return warn(
    "Remote/Cloud push notifications only supported on physical device."
  );
}

export function throwAppSchemeNotDefined() {
  return warn(
    "App scheme is not defined. Define app scheme in expo.json file. \n Read more at https://docs.expo.dev/linking/into-your-app/`"
  );
}

export function throwUnableToOpenDeepLink() {
  return warn(
    "Could not open deep link. Read more at https://docs.pushbase.dev/deep-linking`"
  );
}

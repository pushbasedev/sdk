import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Linking } from "react-native";
import {
  getAppScheme,
  isValidNonEmptyObject,
  isValidUrlWithProtocol,
} from "../utils";
import { throwAppSchemeNotDefined, throwUnableToOpenDeepLink } from "../errors";

import incrementNotificationOpenCount from "../services/updateNotificationOpenCount";
import saveLocalNotificationReads from "../services/saveLocalNotificationReads";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type PushbaseListenerOptions = {
  enableDeepLinking: boolean;
};

const defaultOptions: PushbaseListenerOptions = {
  enableDeepLinking: true,
};

export function usePushbaseListeners(
  optionParams: PushbaseListenerOptions = defaultOptions
) {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const options = {
    ...defaultOptions,
    ...(isValidNonEmptyObject(optionParams) ? optionParams : {}),
  };

  const handleDeepLinking = async (path: string) => {
    const scheme = getAppScheme();

    if (!scheme) return throwAppSchemeNotDefined();
    if (options && options["enableDeepLinking"]) {
      /** Validate if path is HTTP link.
       * Deep linking only applied for no Http link.
       */

      const isHttpLink = isValidUrlWithProtocol(path);
      const url = isHttpLink ? path : `${scheme}://${path}`;

      const canOpenUrl = await Linking.canOpenURL(url);

      if (!canOpenUrl) {
        return throwUnableToOpenDeepLink();
      }

      Linking.openURL(url);
    }
  };
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const notificationData = notification.request.content.data;
        const url = notificationData.url;

        if (url) {
          handleDeepLinking(url);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationData = response.notification.request.content.data;

        const url = notificationData.url;

        const pushId = notificationData.pushId;

        if (url) {
          handleDeepLinking(url);
        }

        /** Increment notification open count by one */
        if (pushId) {
          incrementNotificationOpenCount(pushId);
          /** Add notification to number of opened notifications */
          saveLocalNotificationReads(pushId);
        }

        if (url) {
          handleDeepLinking(url);
        }
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}

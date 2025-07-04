import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  ColorValue,
  Linking,
} from "react-native";

import { subscribeToNotifications } from "../../actions/subscribeToNotifications";
import { isSubscribedToNotifications } from "../../actions/isSubscribedToNotifications";

import * as Notifications from "expo-notifications";
import saveLastSubscriptionRetryTime from "../../services/saveLastSubscriptionRetryTime";
import getLastSubscriptionRetryTime from "../../services/getLastSubscriptionRetryTime";
import { shouldRetrySubscription } from "./utils";
import { requestPermissionsAsync } from "../../services/requestPermissionsAsync";
import { PushbaseExternalIdentity } from "../../types";

type OptInProps = {
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  primaryColor?: string;
  secondaryColor?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonStyle?: ViewStyle;
  secondaryButtonStyle?: ViewStyle;
  primaryButtonLabelStyle?: TextStyle;
  secondaryButtonLabelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  activityIndicator?: ColorValue;
  externalIdentity?: PushbaseExternalIdentity;
  enableNotificationLabel?: string;
  enableNotificationButtonLabel?: string;
  enableNotificationContainerStyle?: ViewStyle;
  enableNotificationLabelStyle?: TextStyle;
  enableNotificationButtonStyle?: ViewStyle;
  enableNotificationButtonLabelStyle?: TextStyle;
  retrySubscriptionIntervalDays?: number;
};

export const OptIn: React.FC<OptInProps> = ({
  title = "Stay Updated",
  subtitle = "Subscribe to notifications to stay informed about important updates and announcements.",
  titleStyle,
  subtitleStyle,
  primaryButtonLabel = "Subscribe Now",
  secondaryButtonLabel = "Maybe Later",
  primaryColor = "#3B82F6",
  secondaryColor = "#F1F4FF",
  primaryButtonStyle,
  secondaryButtonStyle,
  primaryButtonLabelStyle,
  secondaryButtonLabelStyle,
  containerStyle,
  activityIndicator = "#ffffff",
  externalIdentity,
  enableNotificationLabel = "Missed something? Enable notifications in settings and restart the app to stay in the loop.",
  enableNotificationButtonLabel = "Go to Settings",
  enableNotificationContainerStyle,
  enableNotificationLabelStyle,
  enableNotificationButtonStyle,
  enableNotificationButtonLabelStyle,
  retrySubscriptionIntervalDays = 7,
}) => {
  const [isSubscribed, setSubscribed] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [lastSubscriptionRetryTime, setLastSubscriptionRetryTime] = useState<
    string | null
  >(null);

  const [isPermissionBlocked, setPermissionBlocked] = useState(false);
  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { granted, status, canAskAgain } = await requestPermissionsAsync();

      if (status === Notifications.PermissionStatus.DENIED && !canAskAgain) {
        return setPermissionBlocked(true);
      }

      if (granted) {
        setPermissionGranted(true);

        await subscribeToNotifications({
          user: externalIdentity,
        });

        setSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeLater = async () => {
    /* Save last subscription Retry */

    await saveLastSubscriptionRetryTime();

    setIsVisible(false);
  };

  const checkNotificationPermissionStatus = async () => {
    const settings = await Notifications.getPermissionsAsync();

    if (settings.status === Notifications.PermissionStatus.GRANTED) {
      setPermissionGranted(true);
    }

    if (
      settings.status === Notifications.PermissionStatus.DENIED &&
      !settings.canAskAgain
    ) {
      setPermissionBlocked(true);
    }
  };

  const checkLastSubscriptionRetryTime = async () => {
    const lastSubscriptionRetryTime = await getLastSubscriptionRetryTime();

    if (lastSubscriptionRetryTime !== null) {
      setLastSubscriptionRetryTime(lastSubscriptionRetryTime);
    }
  };

  const handleCheckSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const isSubscribed = await isSubscribedToNotifications();

      setSubscribed(isSubscribed);
      if (!isSubscribed) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkLastSubscriptionRetryTime();
    checkNotificationPermissionStatus();
    handleCheckSubscriptionStatus();
  }, []);

  const canRetrySubscription = shouldRetrySubscription(
    lastSubscriptionRetryTime,
    retrySubscriptionIntervalDays
  );

  if (isPermissionBlocked) {
    return (
      <View
        style={[
          styles.enableNotificationContainer,
          enableNotificationContainerStyle,
        ]}
      >
        <Text
          style={[styles.enableNotificationLabel, enableNotificationLabelStyle]}
        >
          {enableNotificationLabel}
        </Text>

        <TouchableOpacity
          style={[
            styles.enableNotificationButton,
            enableNotificationButtonStyle,
          ]}
        >
          <Text
            style={[
              styles.enableNotificationButtonLabel,
              enableNotificationButtonLabelStyle,
            ]}
            onPress={Linking.openSettings}
          >
            {enableNotificationButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isVisible) return null;

  if (!canRetrySubscription) return null;

  if (isSubscribed && isPermissionGranted) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: primaryColor, shadowColor: primaryColor },

            primaryButtonStyle,
          ]}
          onPress={handleSubscribe}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading && (
            <ActivityIndicator size="small" color={activityIndicator} />
          )}
          <Text style={[styles.primaryButtonText, primaryButtonLabelStyle]}>
            {primaryButtonLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            { backgroundColor: secondaryColor, shadowColor: secondaryColor },
            secondaryButtonStyle,
          ]}
          onPress={handleSubscribeLater}
          activeOpacity={0.8}
        >
          <Text style={[styles.secondaryButtonText, secondaryButtonLabelStyle]}>
            {secondaryButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "white",
    rowGap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#19163C",
  },
  subtitle: {
    fontSize: 14,
    color: "#19163C",
    marginVertical: 8,
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 12,
  },

  primaryButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    columnGap: 4,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#F1F4FF",
    shadowColor: "#F1F4FF",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#D7E0FF",
  },
  secondaryButtonText: {
    color: "#19163C",
    fontSize: 14,
    fontWeight: "500",
  },

  enableNotificationContainer: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFF3E0",

    borderWidth: 1,
    borderColor: "#FF9800",
  },

  enableNotificationLabel: {
    color: "#19163C",
    fontSize: 14,
    fontWeight: "400",
  },

  enableNotificationButton: {
    paddingVertical: 8,
    alignSelf: "flex-start",
  },

  enableNotificationButtonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    textDecorationLine: "underline",
  },
});

export default OptIn;

import {
  Alert,
  ColorValue,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

import {
  getAppScheme,
  getRelativeTime,
  isValidUrlWithProtocol,
} from "../../utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import LoadingIndicator from "../LoadingIndicator";
import useNotificationReads from "./hooks/useNotificationReads";
import saveLocalNotificationReads from "../../services/saveLocalNotificationReads";
import incrementNotificationOpenCount from "../../services/updateNotificationOpenCount";
import { PushbaseNotification } from "../../types";
import { useGetNotifications } from "../../hooks/useGetNotifications";

type InboxProps = {
  contentContainer?: ViewStyle;
  titleStyle?: TextStyle;
  bodyStyle?: TextStyle;
  timeStyle?: TextStyle;
  foregroundColor?: ColorValue;
  backgroundColor?: ColorValue;
  navigationIndicatorColor?: ColorValue;
  showNavigationIndicator?: boolean;
  emptyListMessage?: string;
  emptyListStyle?: TextStyle;
  LoadingIndicatorComponent?: React.JSX.Element;
  lookbackDays?: number;
};

export const Inbox = ({
  foregroundColor = "#6366F1",
  backgroundColor = "#EFF0FE",
  navigationIndicatorColor = "#000000",
  showNavigationIndicator = true,
  contentContainer,
  timeStyle,
  bodyStyle,
  titleStyle,
  emptyListStyle,
  emptyListMessage = "You’re all caught up! No notifications for now. Check back later.",
  LoadingIndicatorComponent,
  lookbackDays = 7,
}: InboxProps) => {
  const { data: notifications, loading } = useGetNotifications({
    lookbackDays: lookbackDays,
  });

  const { reads } = useNotificationReads();

  const openDeepLink = async (path: string) => {
    const scheme = getAppScheme();

    /** Validate if path is HTTP link.
     * Deep linking only applied for no Http link.
     */

    const isHttpLink = isValidUrlWithProtocol(path);
    const url = isHttpLink ? path : `${scheme}://${path}`;

    const canOpenLink = await Linking.canOpenURL(url);

    if (!canOpenLink) {
      return Alert.alert("Can open link");
    }

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Can open link");
    }
  };

  const renderItem = ({
    item,
  }: {
    item: PushbaseNotification;
    index: number;
  }) => {
    const isRead = reads.includes(item.id);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          openDeepLink(item.url);
          saveLocalNotificationReads(String(item.id));
          if (!isRead) {
            incrementNotificationOpenCount(Number(item.id));
          }
        }}
        style={[
          styles.itemContainer,
          contentContainer,
          { backgroundColor: isRead ? "transparent" : backgroundColor },
        ]}
      >
        <View
          style={[
            styles.itemReadStatus,
            { backgroundColor: isRead ? "transparent" : foregroundColor },
          ]}
        />
        <View style={styles.itemContent}>
          <Text style={[styles.itemContentTitle, titleStyle]}>
            {item.title}
          </Text>
          <Text style={[styles.itemContentBody, bodyStyle]}>{item.body}</Text>

          <View style={styles.actionContentLower}>
            <Text style={[styles.itemContentElapseTime, timeStyle]}>
              {getRelativeTime(item.pushed_at)}
            </Text>
          </View>
        </View>

        {showNavigationIndicator && (
          <View style={styles.navigationIndicator}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={navigationIndicatorColor}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderListEmpty = () => {
    return (
      <Text style={[styles.emptyListMessage, emptyListStyle]}>
        {emptyListMessage}
      </Text>
    );
  };

  if (loading) {
    if (React.isValidElement(LoadingIndicatorComponent)) {
      return LoadingIndicatorComponent;
    }

    return <LoadingIndicator />;
  }
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.listContentContainer}
      ListEmptyComponent={renderListEmpty}
    />
  );
};

export default Inbox;

const styles = StyleSheet.create({
  listContentContainer: {
    rowGap: 12,
  },
  itemContainer: {
    backgroundColor: "#EFF0FE",
    borderRadius: 12,
    padding: 8,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  itemReadStatus: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    maxWidth: "70%",
    rowGap: 4,
  },

  itemContentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },

  itemContentBody: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },
  navigationIndicator: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  actionContentLower: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 8,
  },

  itemContentElapseTime: {
    fontSize: 12,
    fontWeight: "400",
    color: "gray",
  },

  emptyListMessage: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
});

import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Header from "@/components/Header";
import Inbox from "@/package/src/components/inbox/Inbox";
import { ActivityIndicator } from "react-native";

export default function NotificationScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Notifications" navigator="react-navigation" />

        <Inbox
          contentContainer={{ borderWidth: 0.5, borderColor: "#6366F1" }}
          foregroundColor="#6366F1"
          backgroundColor="#EFF0FE"
          navigationIndicatorColor="#000000"
          showNavigationIndicator
          titleStyle={{ fontSize: 16, fontWeight: "600" }}
          bodyStyle={{ fontSize: 16, fontWeight: "400" }}
          timeStyle={{ fontSize: 12, fontWeight: "400" }}
          emptyListMessage="You’re all caught up! No notifications for now. Check back later."
          LoadingIndicatorComponent={<ActivityIndicator />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
    rowGap: 16,
  },
});

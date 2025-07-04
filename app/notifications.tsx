import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Header from "@/components/Header";
import { Inbox } from "@/package/dist";

export default function NotificationScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Notifications" />

        <Inbox
          contentContainer={{ borderWidth: 0.5, borderColor: "#6366F1" }}
          foregroundColor={"#6366F1"}
          showNavigationIndicator
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

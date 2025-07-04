import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Placeholder from "./Placeholder";

type OpenNotificationProps = {
  navigator?: "expo-router" | "react-navigation";
};

const OpenNotification = ({
  navigator = "expo-router",
}: OpenNotificationProps) => {
  const { navigate } =
    useNavigation<
      NativeStackScreenProps<RootStackParamList, "Destination">["navigation"]
    >();
  const router = useRouter();

  const openNotifications = () =>
    navigator === "react-navigation"
      ? navigate("Notifications")
      : router.push("/notifications");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={openNotifications}
      >
        <Placeholder width={24} height={24} borderRadius={24 / 2} />
        {/* <MaterialIcons name="notifications" size={25} color="#6366F1" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default OpenNotification;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "white",
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

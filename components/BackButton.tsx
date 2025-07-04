import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

type BackButtonProps = {
  navigator?: "expo-router" | "react-navigation";
};

const BackButton = ({ navigator = "expo-router" }: BackButtonProps) => {
  const { goBack } = useNavigation();
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigator === "react-navigation" ? goBack : router.back}
    >
      <MaterialIcons name="chevron-left" size={25} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

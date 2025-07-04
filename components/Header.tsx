import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "./BackButton";

type HeaderProps = {
  title: string;
  navigator?: "expo-router" | "react-navigation";
};
const Header = ({ title, navigator }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <BackButton navigator={navigator} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
});

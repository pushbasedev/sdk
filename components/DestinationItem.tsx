import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Placeholder from "./Placeholder";

export type Destination = {
  slug: string;
  name: string;
  image: string;
};
export const DestinationItemExpoRouter = ({
  name,
  slug,
  image,
}: Destination) => {
  const router = useRouter();
  const handleNavigateToDestination = () =>
    router.push(`/destinations/${slug}`);
  return (
    <TouchableOpacity onPress={handleNavigateToDestination}>
      <View style={itemStyles.container}>
        {/* <Image source={{ uri: image }} style={itemStyles.image} /> */}
        <Placeholder width={80} height={80} borderRadius={80 / 2} />
        <Placeholder width={60} height={15} marginTop={6} />
        {/* <Text>{name}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export const DestinationItemReactNavigation = ({
  name,
  slug,
  image,
}: Destination) => {
  const { navigate } =
    useNavigation<
      NativeStackScreenProps<RootStackParamList, "Destination">["navigation"]
    >();

  const handleNavigateToDestination = () => navigate("Destination", { slug });
  return (
    <TouchableOpacity onPress={handleNavigateToDestination}>
      <View style={itemStyles.container}>
        <Image source={{ uri: image }} style={itemStyles.image} />

        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#F7F7F7",
  },
});

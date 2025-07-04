import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import {
  Destination,
  DestinationItemExpoRouter,
  DestinationItemReactNavigation,
} from "./DestinationItem";
import Placeholder from "./Placeholder";

type DestinationsProps = {
  destinations: Destination[];
  navigator: "expo-router" | "react-navigation";
};

const Destinations = ({
  destinations,
  navigator = "expo-router",
}: DestinationsProps) => {
  console.log({ navigator });
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Destinations</Text> */}

      <Placeholder width={120} height={15} />
      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {destinations.map((destination) =>
          navigator === "react-navigation" ? (
            <DestinationItemReactNavigation
              key={destination.slug}
              {...destination}
            />
          ) : (
            <DestinationItemExpoRouter
              key={destination.slug}
              {...destination}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default Destinations;

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    columnGap: 14,
  },
});

import PropertiesListing from "@/components/ProductListing";
import { View, StyleSheet, SafeAreaView } from "react-native";

import { getAllDestinations, getAllProperties } from "@/helpers";
import Destinations from "@/components/Destinations";
import React from "react";
import OpenNotification from "@/components/OpenNotification";
import { OptIn } from "@/package/src";
import user from "@/datasets/user";

export default function HomeScreen() {
  const properties = getAllProperties();
  const destinations = getAllDestinations();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <OpenNotification navigator="react-navigation" />
        <Destinations
          destinations={destinations}
          navigator="react-navigation"
        />
        <OptIn externalIdentity={user} />
        <PropertiesListing properties={properties} />
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

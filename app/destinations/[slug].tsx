import PropertiesListing from "@/components/ProductListing";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { getDestination, getPropertiesByDestination } from "@/helpers";

import { usePathname } from "expo-router";

import Header from "@/components/Header";
export default function Route() {
  const pathname = usePathname();

  const slug = pathname.split("/")[2];

  const destination = getDestination(slug);

  const propertiesByDestination = getPropertiesByDestination(slug);

  if (!destination) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title={destination.name} />
        <PropertiesListing properties={propertiesByDestination} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    rowGap: 16,
  },
});

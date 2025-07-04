import PropertiesListing from "@/components/ProductListing";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { getDestination, getPropertiesByDestination } from "@/helpers";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

import Header from "@/components/Header";
import { RootStackParamList } from "@/types";
export default function DestinationScreen() {
  const { params } =
    useRoute<
      NativeStackScreenProps<RootStackParamList, "Destination">["route"]
    >();

  const slug = params?.slug;

  const destination = getDestination(slug);

  const propertiesByDestination = getPropertiesByDestination(slug);

  if (!destination) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title={destination.name} navigator="react-navigation" />
        <PropertiesListing properties={propertiesByDestination} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 16,
    rowGap: 16,
  },
});

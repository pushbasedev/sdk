import { Property } from "@/types";
import React, { ReactNode } from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import Placeholder from "./Placeholder";

type CardProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

type PropertyCardProps = {
  title: string;
  location: string;
  price: string;
  image: string;
};

type PropertiesListingProps = {
  properties: Property[];
  title?: string;
};
const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  price,
  image,
}) => (
  <Card>
    {/* <Image source={{ uri: image }} style={styles.image} /> */}

    <Placeholder {...styles.image} />
    {/* <Text style={styles.title}>{title}</Text> */}
    <Placeholder width={120} height={20} marginTop={12} />
    {/* <Text style={styles.location}>{location}</Text>
    <Text style={styles.price}>{price}</Text> */}

    <Placeholder width={100} height={10} marginTop={12} />
  </Card>
);

const PropertiesListing: React.FC<PropertiesListingProps> = ({
  properties,
  title,
}) => {
  return (
    <View style={styles.container}>
      {Boolean(title) && (
        <Text style={styles.title}> {title ?? "Properties"}</Text>
      )}

      <FlatList
        data={properties}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <PropertyCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 16,
  },

  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    margin: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    height: 192,
    width: "100%",
    borderRadius: 12,

    backgroundColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  location: {
    color: "#6b7280",
  },
  price: {
    color: "#10b981",
    fontWeight: "bold",
  },
});

export default PropertiesListing;

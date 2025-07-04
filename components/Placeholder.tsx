import { ColorValue, View, ViewStyle } from "react-native";
import React from "react";

const Placeholder: React.FC<ViewStyle> = ({
  width = 40,
  height = 40,
  borderRadius = 20,
  backgroundColor = "#E0E0E0",
  ...rest
}) => {
  return (
    <View
      style={{ backgroundColor, width, height, borderRadius, ...rest }}
    ></View>
  );
};

export default Placeholder;

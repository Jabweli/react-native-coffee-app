import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BORDERRADIUS, SPACING } from "@/theme/theme";
import { FontAwesome6 } from "@expo/vector-icons";

interface BGIconProps {
  name: string;
  color?: string;
  size?: number;
  bgColor?: string;
}

const BGIcon: React.FC<BGIconProps> = ({ name, color, size, bgColor }) => {
  return (
    <View style={[styles.iconBG, { backgroundColor: bgColor }]}>
      <FontAwesome6 name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  iconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_8,
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SPACING } from "@/theme/theme";

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HeaderBar;

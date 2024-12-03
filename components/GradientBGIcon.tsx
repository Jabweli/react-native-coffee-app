import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS, SPACING } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from "./CustomIcon";
import { BackArrowIcon, HeartIcon, MenuIcon } from "./Icons";

interface Props {
  name: string;
  color: string;
}

const GradientBGIcon: React.FC<Props> = ({ name, color }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradient}
      >
        {name == "menu" && <MenuIcon fill={color} width={18} />}
        {name == "back" && <BackArrowIcon fill={color} />}
        {name == "heart" && <HeartIcon fill={color} />}
      </LinearGradient>
    </View>
  );
};

export default GradientBGIcon;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: "hidden",
  },
  linearGradient: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: "center",
    justifyContent: "center",
  },
});

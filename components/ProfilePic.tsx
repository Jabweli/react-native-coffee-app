import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SPACING } from "@/theme/theme";

const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/app_images/avatar.png")}
        style={styles.Image}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imageContainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

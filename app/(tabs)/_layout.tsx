import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "@/theme/theme";
import CustomIcon from "@/components/CustomIcon";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={15} style={styles.blurViewStyles} />
        ),
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={26}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="shopping-basket"
              size={23}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart"
              size={27}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orderhistory"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bell"
              size={22}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 70,
    // backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    elevation: 0,
    paddingTop: 15,
  },
  blurViewStyles: {
    // position: "absolute",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
});

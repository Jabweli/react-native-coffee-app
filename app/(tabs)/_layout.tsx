import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "@/theme/theme";
import { BlurView } from "expo-blur";
import { BellIcon, CartIcon, HeartIcon, HomeIcon2 } from "@/components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView intensity={5} style={styles.blurViewStyles} />
        ),
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon2
              fill={
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
            <CartIcon
              fill={
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
            <HeartIcon
              fill={
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
            <BellIcon
              fill={
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
    backgroundColor: COLORS.primaryBlackHex,
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

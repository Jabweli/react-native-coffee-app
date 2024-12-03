import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useStore } from "@/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from "@/components/HeaderBar";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { useRouter } from "expo-router";
import CartItem from "@/components/CartItem";
import PopUpAnimation from "@/components/PopUpAnimation";
import OrderHistoryCard from "@/components/OrderHistoryCard";

const orderhistory = () => {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);

  // console.log(OrderHistoryList[0]);
  const navigationHandler = (index: any, type: any) => {
    router.navigate(`/details/${index}-${type}`);
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style="light" />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require("../../lottie/download.json")}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollFlexContainer}
      >
        <View
          style={[styles.scrollInnerContainer, { marginBottom: tabBarHeight }]}
        >
          <HeaderBar title="Order History" />

          {OrderHistoryList.length == 0 ? (
            <EmptyListAnimation title="No Order History!" />
          ) : (
            <View style={styles.listItemContainer}>
              {OrderHistoryList.map((data: any, index: number) => (
                <OrderHistoryCard
                  key={index.toString()}
                  navigationHandler={navigationHandler}
                  CartItems={data.CartList}
                  CartListPrice={data.CartListPrice}
                  OrderDate={data.date}
                />
              ))}
            </View>
          )}

          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              onPress={() => buttonPressHandler()}
              style={styles.downloadBtn}
            >
              <Text style={styles.downloadBtnText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default orderhistory;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    position: "relative",
  },
  lottieAnimation: {
    height: 250,
  },
  scrollFlexContainer: {
    flexGrow: 1,
  },
  scrollInnerContainer: {
    flexGrow: 1,
    // justifyContent: "space-between",
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  downloadBtn: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  downloadBtnText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

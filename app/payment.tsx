import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import { StatusBar } from "expo-status-bar";
import GradientBGIcon from "@/components/GradientBGIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PaymentMode from "@/components/PaymentMode";
import PaymentFooter from "@/components/PaymentFooter";
import { useStore } from "@/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { SimCardIcon, VisaIcon } from "@/components/Icons";
import PopUpAnimation from "@/components/PopUpAnimation";

const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

const Payment = () => {
  const router = useRouter();
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addCartListToOrderHistoryList = useStore(
    (state: any) => state.addCartListToOrderHistoryList
  );

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addCartListToOrderHistoryList();
    calculateCartPrice();

    setTimeout(() => {
      setShowAnimation(false);
      router.navigate("/(tabs)/orderhistory");
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style="light" />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require("../lottie/successful.json")}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <GradientBGIcon name="back" color={COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payments</Text>
          <View style={styles.emptyView} />
        </View>

        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity onPress={() => setPaymentMode("Credit Card")}>
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMode == "Credit Card"
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}
            >
              <Text style={styles.creditCardTitle}>Credit Card</Text>
              <View style={styles.creditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.creditCardGradient}
                >
                  <View style={styles.creditCardRow}>
                    <SimCardIcon
                      fill={COLORS.primaryOrangeHex}
                      width={SPACING.space_20 * 2}
                      height={SPACING.space_20 * 2}
                    />
                    <VisaIcon height={40} width={50} />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.creditCardNumber}>3879</Text>
                    <Text style={styles.creditCardNumber}>7974</Text>
                    <Text style={styles.creditCardNumber}>8918</Text>
                    <Text style={styles.creditCardNumber}>1453</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.cardHolderSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.cardHolderName}>Robert Haggins</Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.cardHolderSubtitle}>Expiry Date</Text>
                      <Text style={styles.cardHolderName}>04/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>

          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => setPaymentMode(data.name)}
            >
              <PaymentMode
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        bottomStyle={{ bottom: 0 }}
        buttonPressHandler={buttonPressHandler}
        price={{ price: CartPrice, currency: "$" }}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    padding: SPACING.space_15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  emptyView: {
    width: SPACING.space_36,
  },
  paymentOptionsContainer: {
    gap: SPACING.space_15,
    marginTop: 20,
  },
  creditCardContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_10,
    borderWidth: 3,
    borderRadius: BORDERRADIUS.radius_15,
  },
  creditCardTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginLeft: SPACING.space_10,
  },
  creditCardBG: {
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.primaryGreyHex,
  },
  creditCardGradient: {
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
    gap: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_25,
  },
  creditCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creditCardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  creditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  creditCardNameContainer: {
    alignItems: "flex-start",
  },
  cardHolderSubtitle: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryLightGreyHex,
  },
  cardHolderName: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  creditCardDateContainer: {
    alignItems: "flex-end",
  },
  lottieAnimation: {
    flex: 1,
  },
});

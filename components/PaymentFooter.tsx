import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler?: any;
  buttonTitle: string;
  bottomStyle: StyleProp<ViewStyle>;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
  bottomStyle,
}) => {
  return (
    <View style={[styles.payFooter, bottomStyle]}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>Price</Text>
        <Text style={styles.priceText}>
          {price.currency} <Text style={styles.pricePrice}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => buttonPressHandler()}
      >
        <Text style={styles.btnText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  payFooter: {
    position: "absolute",
    left: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.space_20,
    gap: SPACING.space_20,
    backgroundColor: COLORS.primaryBlackHex,
  },
  priceContainer: {
    alignItems: "center",
    width: 100,
  },
  priceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_20,
  },
  pricePrice: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
  },
  payBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_20,
    height: SPACING.space_30 * 2,
  },
  btnText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
});

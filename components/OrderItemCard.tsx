import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageSourcePropType;
  special_ingredient: string;
  prices: any;
  itemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  itemPrice,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradient}
    >
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardImageContainer}>
          <Image source={imagelink_square} style={styles.cardImage} />
          <View>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.cardCurrency}>
            $ <Text style={styles.price}>{itemPrice}</Text>
          </Text>
        </View>
      </View>

      {prices.map((data: any, index: number) => (
        <View key={index.toString()} style={styles.cardTableRow}>
          <View style={styles.cardTableRow}>
            <View style={styles.sizeBoxLeft}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    fontSize:
                      data.type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_14,
                  },
                ]}
              >
                {data.size}
              </Text>
            </View>

            <View style={styles.priceBoxRight}>
              <Text style={styles.priceCurrency}>
                $ <Text style={styles.tablePrice}>{data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.cardTableRow}>
            <Text style={styles.cardQtyPriceText}>
              x <Text style={styles.tablePrice}>{data.quantity}</Text>
            </Text>
            <Text style={styles.cardQtyPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  cardLinearGradient: {
    gap: SPACING.space_20,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: BORDERRADIUS.radius_15,
  },
  cardTitle: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  cardSubtitle: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryLightGreyHex,
  },
  cardCurrency: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  cardTableRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sizeBoxLeft: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.primaryGreyHex,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  priceBoxRight: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopRightRadius: BORDERRADIUS.radius_15,
    borderBottomRightRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primaryGreyHex,
  },
  priceCurrency: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  tablePrice: {
    color: COLORS.primaryWhiteHex,
  },
  cardQtyPriceText: {
    flex: 1,
    textAlign: "center",
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
});

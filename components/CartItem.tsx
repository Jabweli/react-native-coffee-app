import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { MinusIcon, PlusIcon } from "./Icons";

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageSourcePropType;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemLinearGradient}
        >
          <View style={styles.cartItemRow}>
            <Image source={imagelink_square} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <View>
                <Text style={styles.cartItemName}>{name}</Text>
                <Text style={styles.cartItemSubtitle}>
                  {special_ingredient}
                </Text>
              </View>

              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{roasted}</Text>
              </View>
            </View>
          </View>

          {prices.map((priceItem: any, index: number) => (
            <View key={index.toString()} style={styles.cartItemPriceRow}>
              <View style={styles.sizeValueContainer}>
                <View style={styles.sizeBox}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}
                  >
                    {priceItem.size}
                  </Text>
                </View>

                <Text style={styles.priceText}>
                  {priceItem.currency} {""}
                  <Text style={styles.price}>{priceItem.price}</Text>
                </Text>
              </View>

              <View style={styles.sizeValueContainer}>
                <TouchableOpacity
                  style={styles.itemBtn}
                  onPress={() =>
                    decrementCartItemQuantityHandler(id, priceItem.size)
                  }
                >
                  <MinusIcon width={12} />
                </TouchableOpacity>
                <View style={styles.itemQty}>
                  <Text style={styles.itemQtyText}>{priceItem.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.itemBtn}
                  onPress={() =>
                    incrementCartItemQuantityHandler(id, priceItem.size)
                  }
                >
                  <PlusIcon width={10} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemSingleLinearGradient}
        >
          <View>
            <Image
              source={imagelink_square}
              style={styles.cartItemSingleImage}
            />
          </View>
          <View style={styles.cartItemSingleInfo}>
            <View>
              <Text style={styles.cartItemName}>{name}</Text>
              <Text style={styles.cartItemSubtitle}>{special_ingredient}</Text>
            </View>

            <View style={styles.singleSizeValueContainer}>
              <View style={styles.sizeBox}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16,
                    },
                  ]}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.priceText}>
                {prices[0].currency} {""}
                <Text style={styles.price}>{prices[0].price}</Text>
              </Text>
            </View>

            <View style={styles.singleQuantityContainer}>
              <TouchableOpacity
                style={styles.itemBtn}
                onPress={() =>
                  decrementCartItemQuantityHandler(id, prices[0].size)
                }
              >
                <MinusIcon width={12} />
              </TouchableOpacity>
              <View style={styles.itemQty}>
                <Text style={styles.itemQtyText}>{prices[0].quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.itemBtn}
                onPress={() =>
                  incrementCartItemQuantityHandler(id, prices[0].size)
                }
              >
                <PlusIcon width={10} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemRow: {
    flexDirection: "row",
    gap: SPACING.space_12,
    flex: 1,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemInfo: {
    paddingVertical: SPACING.space_4,
    flex: 1,
    justifyContent: "space-between",
  },
  cartItemName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  cartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  roastedContainer: {
    height: 50,
    width: 100 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: "center",
    alignItems: "center",
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  cartItemPriceRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_20,
  },
  sizeValueContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sizeBox: {
    width: 90,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_4,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  itemBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_4,
  },
  itemQty: {
    width: 70,
    paddingVertical: SPACING.space_4,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_4,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_4,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
  },
  itemQtyText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  cartItemSingleLinearGradient: {
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemSingleInfo: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  singleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  singleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

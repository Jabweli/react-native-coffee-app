import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import OrderItemCard from "./OrderItemCard";

interface OrderHistoryCardProps {
  navigationHandler: any;
  CartItems: any;
  CartListPrice: string;
  OrderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  CartItems,
  CartListPrice,
  OrderDate,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubtitle}>{OrderDate.split("GMT")[0]}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>$ {CartListPrice}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {CartItems.map((data: any, index: number) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => navigationHandler(data.index, data.type)}
          >
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              itemPrice={data.itemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    gap: SPACING.space_10,
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  headerTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  headerSubtitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_light,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  headerPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});

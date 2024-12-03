import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import CoffeeCard from "./CoffeeCard";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";

const CoffeeList = ({}) => {
  const renderItems: ListRenderItem<> = ({ item }) => (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity>
        <CoffeeCard
          name={item.name}
          image={item.imagelink_square}
          id={item.id}
          index={item.index}
          type={item.type}
          roasted={item.roasted}
          special_ingredient={item.special_ingredient}
          average_rating={item.average_rating}
          price={item.prices[2]}
          buttonPressHandler={() => {}}
        />
      </TouchableOpacity>
    </Link>
  );

  return (
    <FlatList
      ref={listRef}
      data={sortedCoffee}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No data available</Text>
        </View>
      }
      renderItem={renderItems}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatlistContainer}
    />
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  flatlistContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  emptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.space_30 * 3,
  },
  emptyListText: {
    color: COLORS.primaryGreyHex,
    fontSize: FONTSIZE.size_16,
  },
  coffeeBeansTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    color: COLORS.secondaryLightGreyHex,
  },
});

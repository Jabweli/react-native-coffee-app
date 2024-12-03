import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "@/store/store";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import { StatusBar } from "expo-status-bar";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";
import PaymentFooter from "@/components/PaymentFooter";

const CoffeeDetails = () => {
  const router = useRouter();
  const { slug }: { slug: string } = useLocalSearchParams();
  const [index, type] = slug.split("-");
  const item = useStore((state: any) =>
    type == "Coffee" ? state.CoffeeList : state.BeansList
  )[index];

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(item.prices[0]);

  const addToFavorites = useStore((state: any) => state.addToFavorites);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  // toggle favourites
  const ToggleFavorites = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavorites(type, id);
  };

  // add to cart
  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    router.navigate(`/(tabs)/cart`);
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="transparent" style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollViewFlex,
          {
            paddingBottom: fullDesc
              ? SPACING.space_36 * 2 + SPACING.space_20
              : 0,
          },
        ]}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={item.imagelink_portrait}
          type={item.type}
          id={item.id}
          name={item.name}
          favourite={item.favourite}
          roasted={item.roasted}
          special_ingredient={item.special_ingredient}
          ingredients={item.ingredients}
          average_rating={item.average_rating}
          ratings_count={item.ratings_count}
          BackHander={() => router.back()}
          ToggleFavourite={ToggleFavorites}
        />

        <View style={styles.footerInfoArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text style={styles.descText}>{item.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text style={styles.descText} numberOfLines={3}>
                {item.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {item.prices.map((priceItem: any) => (
              <TouchableOpacity
                key={priceItem.size}
                style={[
                  styles.sizeInnerContainer,
                  {
                    borderColor:
                      price.size == priceItem.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
                onPress={() => setPrice(priceItem)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        priceItem.type == "Bean"
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        price.size == priceItem.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryWhiteHex,
                    },
                  ]}
                >
                  {priceItem.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <PaymentFooter
        price={price}
        buttonTitle="Add To Cart"
        buttonPressHandler={() =>
          addToCartHandler({
            id: item.id,
            index: item.index,
            name: item.name,
            roasted: item.roasted,
            imagelink_square: item.imagelink_square,
            special_ingredient: item.special_ingredient,
            type: item.type,
            price: price,
          })
        }
        bottomStyle={{ bottom: 0 }}
      />
    </View>
  );
};

export default CoffeeDetails;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  footerInfoArea: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  sizeInnerContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_10,
    height: SPACING.space_24 * 2,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

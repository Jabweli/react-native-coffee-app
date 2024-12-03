import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import ImageBackgroundInfo from "./ImageBackgroundInfo";

interface FavoriteItemProps {
  id: string;
  name: string;
  imagelink_portrait: ImageSourcePropType;
  special_ingredient: string;
  roasted: string;
  type: string;
  ingredients: string;
  description: string;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  ToggleFavoriteItem: any;
}

const FavoritesItemCard: React.FC<FavoriteItemProps> = ({
  id,
  name,
  imagelink_portrait,
  special_ingredient,
  roasted,
  type,
  ingredients,
  description,
  average_rating,
  ratings_count,
  favourite,
  ToggleFavoriteItem,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        name={name}
        favourite={favourite}
        roasted={roasted}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        // BackHander={() => router.back()}
        ToggleFavourite={ToggleFavoriteItem}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.cartItemLinearGradient}
      >
        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.descText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavoritesItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  cartItemLinearGradient: {
    padding: SPACING.space_20,
    gap: SPACING.space_10,
  },
  descTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  descText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

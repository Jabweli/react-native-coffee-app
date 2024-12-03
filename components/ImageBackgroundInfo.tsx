import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import GradientBGIcon from "./GradientBGIcon";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CoffeBeanIcon,
  CoffeBeansIcon,
  MapPinIcon,
  RainDropIcon,
  StarIcon,
} from "./Icons";

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageSourcePropType;
  type: string;
  id: string;
  name: string;
  favourite: boolean;
  roasted: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  BackHander?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  name,
  favourite,
  roasted,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  BackHander,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground source={imagelink_portrait} style={styles.itemBG}>
        <SafeAreaView>
          {EnableBackHandler ? (
            <View style={styles.headerWithBackBtn}>
              <TouchableOpacity onPress={() => BackHander()}>
                <GradientBGIcon
                  name="back"
                  color={COLORS.primaryLightGreyHex}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ToggleFavourite(favourite, type, id)}
              >
                <GradientBGIcon
                  name="heart"
                  color={
                    favourite
                      ? COLORS.primaryRedHex
                      : COLORS.primaryLightGreyHex
                  }
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.headerWithOutBackBtn}>
              <TouchableOpacity
                onPress={() => ToggleFavourite(favourite, type, id)}
              >
                <GradientBGIcon
                  name="heart"
                  color={
                    favourite
                      ? COLORS.primaryRedHex
                      : COLORS.primaryLightGreyHex
                  }
                />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>

        <View style={styles.infoOuterContainer}>
          <View style={styles.infoInnerContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Text style={styles.itemTitle}>{name}</Text>
                <Text style={styles.itemSubtitle}>{special_ingredient}</Text>
              </View>

              <View style={styles.itemPropertiesContainer}>
                <View style={styles.propertyFirst}>
                  {type == "Bean" ? (
                    <CoffeBeanIcon fill={COLORS.primaryOrangeHex} />
                  ) : (
                    <CoffeBeansIcon
                      fill={COLORS.primaryOrangeHex}
                      height={24}
                    />
                  )}

                  <Text style={[styles.propertyTextFirst]}>{type}</Text>
                </View>

                <View style={styles.propertyFirst}>
                  {type == "Bean" ? (
                    <MapPinIcon fill={COLORS.primaryOrangeHex} />
                  ) : (
                    <RainDropIcon fill={COLORS.primaryOrangeHex} />
                  )}

                  <Text
                    style={[
                      styles.propertyTextFirst,
                      {
                        marginTop: SPACING.space_2,
                      },
                    ]}
                  >
                    {ingredients}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoContainerRow}>
              <View style={styles.ratingContainer}>
                <StarIcon fill={COLORS.primaryOrangeHex} />
                <Text style={styles.ratingText}>{average_rating}</Text>
                <Text style={styles.ratingCount}>({ratings_count})</Text>
              </View>

              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  itemBG: {
    width: "100%",
    aspectRatio: 20 / 24,
    justifyContent: "space-between",
  },
  headerWithBackBtn: {
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerWithOutBackBtn: {
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  infoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_20,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  infoInnerContainer: {
    justifyContent: "space-between",
    gap: SPACING.space_15,
  },
  infoContainerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  itemSubtitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  itemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  propertyFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: "center",
    justifyContent: "center",
  },
  propertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  ratingCount: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: "center",
    justifyContent: "center",
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
});

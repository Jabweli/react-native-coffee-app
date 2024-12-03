import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING } from "@/theme/theme";
import HeaderBar from "@/components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { useRouter } from "expo-router";
import FavoritesItemCard from "@/components/FavoritesItemCard";

const Favorites = () => {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavorites = useStore((state: any) => state.addToFavorites);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );

  // toggle favourites
  const ToggleFavorite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavorites(type, id);
  };

  return (
    <SafeAreaView style={styles.cartContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartScrollFlex}
      >
        <View
          style={[
            styles.scrollInnerView,
            {
              marginBottom: tabBarHeight,
            },
          ]}
        >
          <View style={styles.itemContainer}>
            <HeaderBar title="Favorites" />
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title="No Favorites!" />
            ) : (
              <View style={styles.listItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() =>
                      router.navigate(`/details/${data.index}-${data.type}`)
                    }
                  >
                    <FavoritesItemCard
                      id={data.id}
                      name={data.name}
                      imagelink_portrait={data.imagelink_portrait}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      type={data.type}
                      ingredients={data.ingredients}
                      description={data.description}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      favourite={data.favourite}
                      ToggleFavoriteItem={ToggleFavorite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    position: "relative",
  },
  cartScrollFlex: {
    flexGrow: 1,
  },
  scrollInnerView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

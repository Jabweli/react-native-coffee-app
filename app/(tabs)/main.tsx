import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useRef, useState } from "react";
import { useStore } from "@/store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "@/components/HeaderBar";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import CoffeeCard from "@/components/CoffeeCard";
import { Link, useRouter } from "expo-router";
import { CloseIcon, SearchIcon } from "@/components/Icons";

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === "All") {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

export default function Home() {
  const router = useRouter();
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const beansList = useStore((state: any) => state.BeansList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(coffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffeeList)
  );

  const tabBarHeight = useBottomTabBarHeight();
  const listRef: any = useRef<FlatList>();

  const handleSelectCategory = (index: number) => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index, category: categories[index] });
    setSortedCoffee([...getCoffeeList(categories[index], coffeeList)]);
  };

  // console.log(sortedCoffee);

  const searchCoffee = (search: string) => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([
      ...coffeeList.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    ]);
  };

  const resetSearchCoffee = () => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...coffeeList]);
    setSearchText("");
  };

  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  // add to cart
  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* App header */}
        <HeaderBar />

        <Text style={styles.screenTitle}>
          Find the best{"\n"}coffee for you
        </Text>

        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              searchCoffee(searchText);
            }}
          >
            <SearchIcon
              fill={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              styles={styles.inputIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CloseIcon
                fill={COLORS.primaryLightGreyHex}
                styles={{ marginHorizontal: SPACING.space_20 }}
                width={14}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories.map((category, index) => (
            <View key={index.toString()} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBtnItem}
                onPress={() => handleSelectCategory(index)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index
                      ? { color: COLORS.primaryOrangeHex }
                      : {},
                  ]}
                >
                  {category}
                </Text>
                {categoryIndex.index === index ? (
                  <View style={styles.activeCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* coffee flatlist */}
        <FlatList
          ref={listRef}
          data={sortedCoffee}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No data available</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Link href={`/details/${item.index}-${item.type}`} asChild>
              <TouchableOpacity>
                <CoffeeCard
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCartHandler}
                />
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainer}
        />

        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        {/* coffee beans flatlist */}
        <FlatList
          data={beansList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/details/${item.index}-${item.type}`)}
            >
              <CoffeeCard
                name={item.name}
                imagelink_square={item.imagelink_square}
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatlistContainer,
            { marginBottom: tabBarHeight },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SPACING.space_20,
    marginVertical: SPACING.space_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
  },
  inputIcon: {
    marginLeft: SPACING.space_20,
    marginRight: SPACING.space_12,
  },
  searchInput: {
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    flex: 1,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
    marginTop: SPACING.space_10,
  },
  categoryContainer: { paddingHorizontal: SPACING.space_15 },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  categoryBtnItem: {
    alignItems: "center",
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
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

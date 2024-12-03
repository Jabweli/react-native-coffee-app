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
import PaymentFooter from "@/components/PaymentFooter";
import { useRouter } from "expo-router";
import CartItem from "@/components/CartItem";

const cart = () => {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
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
              marginBottom:
                tabBarHeight + SPACING.space_36 * 2 + SPACING.space_20,
            },
          ]}
        >
          <View style={styles.itemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length == 0 ? (
              <EmptyListAnimation title="Cart is Empty!" />
            ) : (
              <View style={styles.listItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() =>
                      router.navigate(`/details/${data.index}-${data.type}`)
                    }
                  >
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {CartList.length != 0 ? (
        <PaymentFooter
          buttonTitle="Pay"
          buttonPressHandler={() => router.navigate("/payment")}
          price={{ price: CartPrice, currency: "$" }}
          bottomStyle={{ bottom: 50 }}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default cart;

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
    // justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

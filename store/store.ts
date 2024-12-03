import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "@/data/CoffeeData";
import BeansData from "@/data/BeansData";

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) => {
        set(
          produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              // check if added cartitem is already in cart - CartList
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;

                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  // check the corresponding item size and update it quantity
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }

                // if the size for the item is not present, add it
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }

                // sort the prices
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            // if item not present added it to cartList
            if (found == false) {
              state.CartList.push(cartItem);
            }
          })
        );
      },
      calculateCartPrice: () => {
        set(
          produce((state) => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].itemPrice = tempprice.toFixed(2).toString();
              totalPrice = totalPrice + tempprice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          })
        );
      },
      addToFavorites: (type: string, id: string) => {
        set(
          produce((state) => {
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeansListList.length; i++) {
                if (state.BeansList[i].id == id) {
                  if (state.BeansList[i].favourite == false) {
                    state.BeansList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeansList[i]);
                  }
                  break;
                }
              }
            }
          })
        );
      },
      deleteFromFavoriteList: (type: string, id: string) => {
        set(
          produce((state) => {
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == true) {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeansListList.length; i++) {
                if (state.BeansList[i].id == id) {
                  if (state.BeansList[i].favourite == true) {
                    state.BeansList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          })
        );
      },
      incrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          })
        );
      },
      decrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    // check there is more than 1 size variation
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          })
        );
      },
      addCartListToOrderHistoryList: () => {
        set(
          produce((state) => {
            let temp = state.CartList.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator + parseFloat(currentValue.itemPrice),
              0
            );

            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                date:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                date:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          })
        );
      },
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

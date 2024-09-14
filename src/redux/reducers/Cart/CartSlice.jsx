import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: true,
    error: false,
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    userLogin: { userInfo: userInfoFromStorage },
    paymentMethod: paymentMethodFromStorage,
  },
  reducers: {
    //ACTION TYPE 1
    CART_ADD_ITEM: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartitem) => cartitem.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartitem) =>
            //update with x value if condition fails
            //note productId is an id see cartAction.js file
            cartitem.productId === existItem.productId ? item : cartitem
          ),
        };
      } else {
        //add new item
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },

    //ACTION TYPE 2
    CART_UPDATE_ITEM: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId === productId
      );

      if (item) {
        item.quantity = quantity; // Update the quantity
      }
    },

    //ACTION TYPE 3
    CART_REMOVE_ITEM: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    },

    //ACTION TYPE 4
    CART_ERROR: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },

    CART_SAVE_SHIPPING_ADDRESS: (state, action) => {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },

    CART_SAVE_PAYMENT_METHOD: (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },

    CART_CLEAR_ITEMS: (state) => {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_ERROR,
} = CartSlice.actions;
export default CartSlice.reducer;

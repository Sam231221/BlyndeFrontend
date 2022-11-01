import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage= localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null

export const CartSlice= createSlice({
    name: "cart",
    initialState: {
          loading: true,
          error:false, 
          cartItems:cartItemsFromStorage,
          shippingAddress:shippingAddressFromStorage,
          userLogin: { userInfo: userInfoFromStorage },
          paymentMethod: paymentMethodFromStorage,
    },
    reducers: {
    
          //ACTION TYPE 1
          CART_ADD_ITEM: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            console.log(item, ':', existItem)
            if (existItem){
              return {...state, cartItems:state.cartItems.map(x =>
                  //update with x value if condition fails
                  //note product is an id see cartAction.js file
                  x.product === existItem.product ? item : x
                )}
            }else{
                //add new item
                return {...state, cartItems:[...state.cartItems, item]}
            }
            
          },
    
          //ACTION TYPE 2
          CART_REMOVE_ITEM: (state, action) => {
            console.log('payload:',action.payload, ' state:', state)
            return {
              ...state,
              cartItems: state.cartItems.filter(x => x.product !== action.payload)
          }
          },

          //ACTION TYPE 2
          CART_ERROR: (state, action) => {
            console.log('payload:',action.payload, ' state:', state)
            return {
              ...state,
              error: action.payload
          }
          },

    
          CART_SAVE_SHIPPING_ADDRESS:(state, action)=> {
              return{
                ...state,
                shippingAddress: action.payload
              }
            },

        CART_SAVE_PAYMENT_METHOD:(state, action)=>{
              return{
                ...state,
                paymentMethod: action.payload
              }
            },

        CART_CLEAR_ITEMS:(state, action)=>{
          return {
            ...state,
            cartItems: []
        }
        }


    }

});
  
export const { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS,CART_ERROR} = CartSlice.actions;
export default CartSlice.reducer;
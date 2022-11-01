import { createSlice } from "@reduxjs/toolkit";

export const ProductListSlice = createSlice({
  name: "productList",
  initialState: {loading: false, error:false, products:[]},
  reducers: {

    /*
    Action is an object that has 2 atttributes 'type' and 'payload'.
    actions will beb triggered by dispatch() in productionAction.js
    And then State object(initially  {loading: true, products:[]}) will be updated according to the action triggered
    payload -> {loading: true, products:[]}

    For Example:
    For PRODUCT_LIST_SUCCESS.
      payload: (2) [{…}, {…}]
      type: "product/PRODUCT_LIST_SUCCESS"
      [[Prototype]]: Object

      a. type -> product refers to name of reducer to which the action belongs to followed by name of action
      b. payload -> this field is used to update the state. 
      */

    //ACTION TYPE 1( Recall switch(action.type) from reducers)
    PRODUCT_LIST_REQUEST: (state, action) => {
      return {loading: true, products:[]}
    },

    //ACTION TYPE 2
    PRODUCT_LIST_SUCCESS: (state, action) => {
      console.log('payload:',action.payload, ' state:', state)
      return {
          loading: false,
          products:action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages
        }
    },

    //ACTION TYPE 3
    PRODUCT_LIST_FAIL: (state, action) => {
      console.log(action.payload)
      return {loading: false, error:action.payload}
    },



  },
});

//ProductListSlice is a action that must be eported
export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } = ProductListSlice.actions;

//enable us to import the slice as ProductReducer
export default ProductListSlice.reducer;


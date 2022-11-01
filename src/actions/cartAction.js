import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_CLEAR_ITEMS, CART_ERROR } from '../reducers/Cart/CartSlice'

export const addToCart = (id, quantity) => async (dispatch, getState) =>{
    try{
        console.log('id:', id ,' quantity:', quantity)
        const {data} = await axios.get(`/api/products/${id}`)
        console.log('cdata:', data)
   
        dispatch(
            CART_ADD_ITEM({
                product:data._id, 
                name:data.name, 
                thumbnail:data.thumbnail,
                price:data.price,
                countInStock:data.countInStock,
                quantity:Number(quantity),
            })
        )
        console.log('getState():', getState().cart)
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    }catch(error){
        dispatch(CART_ERROR(
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        ))
    }

}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(CART_SAVE_SHIPPING_ADDRESS(data))
    //after upating state ,we also wanna set it to localstorage.
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(CART_SAVE_PAYMENT_METHOD(data))
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
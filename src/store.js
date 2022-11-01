import {configureStore} from '@reduxjs/toolkit';


import ProductDetailReducer from './reducers/Product/ProductDetailSlice';
import CartReducer from './reducers/Cart/CartSlice';
import UserLoginReducer from './reducers/User/UserLoginSlice';
import ProductListReducer from './reducers/Product/ProductListSlice';
import ProductDeleteReducer from './reducers/Product/ProductDeleteSlice';
import ProductCreateReducer from './reducers/Product/ProductCreateSlice';
import ProductUpdateReducer from './reducers/Product/ProductUpdateSlice';
import ProductTopRatedReducer from './reducers/Product/ProductTopRatedSlice';

//Users
import UserRegisterReducer from './reducers/User/UserRegisterSlice';
import UserUpdateProfileSlice from './reducers/User/UserUpdateProfileSlice';
import UserDetailReducer from './reducers/User/UserDetailSlice';
import UserDeleteReducer from './reducers/User/UserDeleteSlice';
import UserListReducer from './reducers/User/UserListSlice';
import UserUpdateReducer from './reducers/User/UserUpdateSlice';

//Orders
import MyOrderListReducer from './reducers/Order/MyOrderListSlice';
import OrderDetailsReducer from './reducers/Order/OrderDetailsSlice';
import OrderCreateReducer from './reducers/Order/OrderCreateSlice';
import OrderDeliveryReducer from './reducers/Order/OrderDeliverySlice'
import OrderListsReducer from './reducers/Order/OrderListsSlice';
import OrderPayReducer from './reducers/Order/OrderPaySlice';
import UserLikeReducer from './reducers/User/UserLikeSlice';


//Admin
const store = configureStore({
    reducer:{

        //Products
        productList:ProductListReducer,
        productDetails: ProductDetailReducer,
        productDelete: ProductDeleteReducer,
        productCreate: ProductCreateReducer,
        productUpdate: ProductUpdateReducer,
        productTopRated: ProductTopRatedReducer,

        cart: CartReducer,

        userLogin: UserLoginReducer,
        userRegister: UserRegisterReducer,
        userProfileUpdate: UserUpdateProfileSlice,
        userDelete:UserDeleteReducer,
        userList: UserListReducer,
        userDetails: UserDetailReducer,
        userUpdate: UserUpdateReducer,
        userLikes: UserLikeReducer,

        orderCreate: OrderCreateReducer,
        orderDetails: OrderDetailsReducer,
        orderPay: OrderPayReducer,
        orderListMy: MyOrderListReducer,
        orderList: OrderListsReducer,
        orderDeliver: OrderDeliveryReducer,

      },

    })
        
export default store    

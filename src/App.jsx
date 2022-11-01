import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductScreen from './screens/ProductScreen';
import { HomeScreen } from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/Authentication/LoginScreen';
import RegisterScreen from './screens/Authentication/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen';

import OrderListScreen from './screens/admin/OrderListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import ProductListScreen from './screens/admin/ProductListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';


import './style.css'

function App() {
  return (
    <Router>

      <Routes>

          <Route exact path="/" element={<HomeScreen />}></Route>
          <Route exact path="/product/:id" element={<ProductScreen />}></Route>

          {/*Authentication */}
          <Route exact path='/login' element={<LoginScreen />} />
          <Route exact path='/register' element={<RegisterScreen />} />
          <Route exact path='/profile' element={<ProfileScreen />} />

          {/* Cart */}
          <Route path="/cart/*" element={<CartScreen />}></Route>

          {/* Checkout */}
          <Route exact path='/shipping' element={<ShippingScreen />} />
          <Route exact path='/payment' element={<PaymentScreen />} />

          <Route exact path='placeorder' element={<PlaceOrderScreen />}></Route>

          {/*payment button */}
          <Route exact path='/order/:id' element={<OrderScreen />} />


          {/* Admin Section */}
          <Route exact path='/admin/userlist' element={<UserListScreen />} />
          <Route exact path='/admin/user/:id/edit' element={<UserEditScreen />} />

          <Route exact path='/admin/productlist' element={<ProductListScreen />} />
          <Route exact path='/admin/product/:id/edit' element={<ProductEditScreen />} />

          <Route exact path='/admin/orderlist' element={<OrderListScreen />} />


      </Routes>


    </Router>
  );
}

export default App;

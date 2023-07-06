import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './features/product-list/components/ProductDetail';
import ProductdetailPage from './pages/ProductdetailPage';
import Protected from './features/auth/Components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInuser } from './features/auth/authSlice';
import { getCartItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/PageNotFound';
import Ordersuccess from './pages/Ordersuccess';
import Navbar from './features/navbar/Navbar';
import UserOrders from './features/user/Components/UserOrders';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/Components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path: '/login',
    element: (<LoginPage></LoginPage>),
  },
  {
    path: '/signup',
    element: (<SignUpPage></SignUpPage>),
  },
  {
    path: '/cart',
    element: (<Protected><CartPage></CartPage></Protected>),
  },
  {
    path: '/checkout',
    element: (<Protected><Checkout></Checkout></Protected>),
  },
  {
    path: '/product-detail/:id',
    element: (<Protected><ProductdetailPage></ProductdetailPage></Protected>),
  },
  {
    path: '*',
    element: (<PageNotFound></PageNotFound>),
  },
  {
    path: '/order-success/:id',
    element: (<Ordersuccess ></Ordersuccess>),
  },
  {
    path: '/orders',
    element: (<UserOrderPage></UserOrderPage>),
  },
  {
    path: '/MyProfile',
    element: (<UserProfilePage></UserProfilePage>),
  }
  ,
  {
    path: '/logout',
    element: (<Logout></Logout>)
  }
  ,
  {
    path: '/forgot-password',
    element: (<ForgotPasswordPage></ForgotPasswordPage>)
  }
]);

function App() {
const dispatch= useDispatch();
const user = useSelector(selectLoggedInuser);

  useEffect(()=>{
    if(user){
      console.log(user.id)
    dispatch(getCartItemsByUserIdAsync(user.id));
    dispatch(fetchLoggedInUserAsync(user.id));
    }
   },[dispatch,user])

  
  return (
    <div className="App">
     <RouterProvider router={router} />
     
    </div>
  );
}

export default App;

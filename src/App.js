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
import AdminHome from './pages/AdminHome';
import ProtectedAdmin from './features/auth/Components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>
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
    path: '/admin/product-detail/:id',
    element: (<ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>),
  },
  {
    path: '/admin/product-form',
    element: (<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (<ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>),
  },
  {
    path: '/admin/orders',
    element: (<ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>),
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
       <Provider template={AlertTemplate} {...options}>
     <RouterProvider router={router} /></Provider>
     
    </div>
  );
}

export default App;

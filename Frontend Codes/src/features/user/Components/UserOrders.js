import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedInUserOrders,
  selectUserInfo,
  selectUserInfoStatus,
} from "../userSlice";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectLoggedInUserOrders);
  const status= useSelector(selectUserInfoStatus) ; 
  console.log(orders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, []);

  return (
    <div>
      {orders && orders.map((order) => (
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl mb-5 font-bold tracking-tight text-gray-900">
              Order #{order.id}
            </h1>
            <h5 className="text-1xl mb-5 font-bold tracking-tight text-gray-900">
              Order Status : {order.status}
            </h5>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.products.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.thumbnail}>
                                {item.product.title}
                              </a>
                            </h3>
                            <p className="ml-4">
                              $ {discountedPrice(item.product)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty{":"}
                              {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul role="list" className="divide-y divide-gray-100">
                  <li>Shipping Address :</li>
                  <li className="flex justify-between gap-x-6 py-5 px-5 border-solid border-gray-200 border-2">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.street} ,{" "}
                          {order.selectedAddress.pincode}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {order.selectedAddress.phone}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
  <div className="flex justify-between text-base font-medium text-gray-900">
    <p>Total Items in Cart</p>
    <p>{totalItems} items</p>
  </div>
  <div className="flex justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>$ {totalAmount}</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <Link to='/checkout'
      href="#"
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Checkout
    </Link>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or <span>  </span>
      <Link to='/'>
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
    </p>
  </div>
</div> */}
          </div>
        </div>
      ))}
      {status=='loading'?
        <Grid
        height="80"
        width="80"
        color="#0077b6"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />:null
      }
    </div>
  );
}

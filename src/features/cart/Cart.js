import React, { Fragment,useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
 
//   increment,
  
//   incrementAsync,
//   selectCount
 
// } from './cartSlice';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom';
import { getCartItemsAsync, getCartItemsByUserIdAsync, selectCartItems, updateCartItemAsync } from './cartSlice';



export default function Cart() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const params =useParams;
  // useEffect(()=>{
  //  dispatch(getCartItemsByUserIdAsync(params.id));
  // },[])
  const [open, setOpen] = useState(true);
  const products =useSelector(selectCartItems);
  const dispatch = useDispatch();
    console.log(products);

     const totalAmount= products.reduce((amount,products)=>products.price*products.quantity +amount,0)
     const totalItems= products.reduce((total,products)=>products.quantity +total,0)

     const handleQuantity=(e,product)=>{
      dispatch(updateCartItemAsync({...product, quantity :+e.target.value}))
     }

  return (
    <>
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900">Cart</h1>
    <div className="mt-8">
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={product.thumbnail}>{product.title}</a>
                  </h3>
                  <p className="ml-4">$ {product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">

                <div className="text-gray-500"><label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                  Qty
                </label> 
                <select onChange={(e)=>{handleQuantity(e,product)}}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>


<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
</div>
</div>
</>

  );
}

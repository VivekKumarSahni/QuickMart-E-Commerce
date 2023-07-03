import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, getCartItems, getCartItemsByUserId, updateCartItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const getCartItemsByUserIdAsync = createAsyncThunk(
  'cart/getCartItemsByUserId',
  async (userId) => {
    const response = await getCartItemsByUserId(userId);
    return response.data;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (update) => {
    const response = await updateCartItem(update);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      }).addCase(getCartItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      }).addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const ind= state.items.find(it=>it.id===action.payload.id)
        state.items[state.items.indexOf(ind)]=action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;


export const selectCartItems = (state) => state.cart.items;



export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCartItem, getCartItems, getCartItemsByUserId, resetCart, updateCartItem } from './cartAPI';

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
  async () => {
    const response = await getCartItemsByUserId();
    return response.data;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (update) => {
    const response = await updateCartItem(update);
    console.log(response.data);
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    console.log(response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    console.log(response);
    // The value we return becomes the `fulfilled` action payload
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
        const ind= state.items.findIndex(it=>it.id===action.payload.id)
        state.items[ind]=action.payload;
        // const ind= state.items.find(it=>it.id===action.payload.id)
        // state.items[state.items.indexOf(ind)]=action.payload;
      }).addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      }).addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      });
  },
});

export const { increment } = cartSlice.actions;


export const selectCartItems = (state) => state.cart.items;



export default cartSlice.reducer;

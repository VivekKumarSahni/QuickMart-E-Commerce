import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orders: [],
  currentorder:null,
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentorder =null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentorder=action.payload;
      });
  },
});

export const selectCurrentOrder =(state)=> state.order.currentorder;

export const {resetOrder}= orderSlice.actions;

export default orderSlice.reducer;

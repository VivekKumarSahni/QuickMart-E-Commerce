import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {   fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  // userOrders: [],
  status: 'idle',
  userInfo:null, // this will be used in case of fetailed user info
};


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this  user can be different or more from logged-in User info
        state.userInfo.orders = action.payload;
      }).addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this  user can be different or more from logged-in User info
        state.userInfo = action.payload;
      }).addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this  user can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

// export const { increment } = counterSlice.actions;


//TODO: change orders and address to be independent od user
export const selectLoggedInUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;



export default userSlice.reducer;

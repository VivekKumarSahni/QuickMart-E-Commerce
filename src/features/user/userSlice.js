import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {   fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo:null, // this will be used in case of fetailed user info
};


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
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
        state.userOrders = action.payload;
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
        state.userOrders = action.payload;
      });
  },
});

// export const { increment } = counterSlice.actions;


export const selectLoggedInUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;



export default userSlice.reducer;

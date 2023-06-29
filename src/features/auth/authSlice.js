import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser} from './authAPI';

const initialState = {
  loggedInuser:null,
  status: 'idle',
  error:null
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      }) .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      }).addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});

export const { increment } = authSlice.actions;


export const selectLoggedInuser = (state) => state.auth.loggedInuser;
//in state.auth.loggedInuser  auth is defined in store.js


export default authSlice.reducer;

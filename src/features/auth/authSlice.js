import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut} from './authAPI';
import { updateUser } from '../user/userAPI';

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
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
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
export const signOutUserAsync = createAsyncThunk(
  'user/signOutUser',
  async (userId) => {
    const response = await signOut(userId);
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
      }).addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      }).addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = null;
      });
  },
});

export const { increment } = authSlice.actions;


export const selectLoggedInuser = (state) => state.auth.loggedInuser;
export const selectError = (state) => state.auth.error;
//in state.auth.loggedInuser  auth is defined in store.js


export default authSlice.reducer;

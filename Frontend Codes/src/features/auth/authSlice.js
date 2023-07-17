import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut,checkAuth} from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInuserToken:null,
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

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo,{rejectWithValue}) => {
    try{
    const response = await loginUser(loginInfo);
    return response.data;
    }
    catch(error){
      console.log(error)
     return  rejectWithValue(error);
    }
  }
);

//made because while refreshing we are getting log out
export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try{
    const response = await checkAuth();
    return response.data;
    }
    catch(error){
      console.log(error)
    }
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
        state.loggedInuserToken = action.payload;
      }) .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuserToken = action.payload;
      }).addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';

        state.error = action.payload;
        console.log(state.error)
      }).addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuserToken = null;
      }).addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuserToken = null;
      });
  },
});

export const { increment } = authSlice.actions;


export const selectLoggedInuserToken = (state) => state.auth.loggedInuserToken;
export const selectError = (state) => state.auth.error;
//in state.auth.loggedInuserToken  auth is defined in store.js


export default authSlice.reducer;

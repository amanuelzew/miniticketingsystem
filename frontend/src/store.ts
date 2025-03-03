import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COOKIE_NAME } from './utils/constants';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
};

// Create a slice of the state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      const userData = action.payload;
      localStorage.setItem(COOKIE_NAME, userData._id)
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(COOKIE_NAME)
    },
    signup:(state, action: PayloadAction<User>) => {
        state.user = action.payload;
        const userData = action.payload;
        localStorage.setItem(COOKIE_NAME, userData._id)
    },
  }
});

// Export the actions
export const { login, logout,signup,setUser } = userSlice.actions;

// Configure the store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

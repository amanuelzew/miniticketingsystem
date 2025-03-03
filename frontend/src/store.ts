import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import ticketReducer from './slices/ticketSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    ticket: ticketReducer
  }
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

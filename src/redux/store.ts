import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
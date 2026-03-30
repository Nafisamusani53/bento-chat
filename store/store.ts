import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlice';
import navigationSlice from './slices/navigationSlice';
import chatSlice from './slices/chatSlice';
import trackUserSlice from './slices/trackUserSlice'

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    navigation : navigationSlice,
    chat : chatSlice,
    trackUser: trackUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

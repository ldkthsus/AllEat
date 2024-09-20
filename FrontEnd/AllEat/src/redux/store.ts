import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';  // authSlice 리듀서 임포트

export const store = configureStore({
  reducer: {
    auth: authReducer,  // auth 리듀서 등록
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 사용
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import paymoneyReducer from './features/paymoneySlice';
import infoReducer from './features/infoSlice';
import menuReducer from './features/menuSlice';
// Redux Persist 설정
const persistConfig = {
  key: 'auth', // auth 상태를 영구적으로 저장
  storage: AsyncStorage, // AsyncStorage를 사용하여 저장
};

// authReducer를 persistReducer로 감쌉니다.
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedInfoReducer = persistReducer(persistConfig, infoReducer);

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // 영구적으로 저장되는 리듀서
    paymoney: paymoneyReducer, // paymony 리듀서 등록
    info: persistedInfoReducer,
    menu: menuReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 경고 무시
    }),
});

// Persistor 생성
export const persistor = persistStore(store);

// 타입 정의
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

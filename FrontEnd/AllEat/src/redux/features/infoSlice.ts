// infoSlice.ts

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../../utils/api';

interface InfoState {
  user_name: string;
  user_age: string;
  user_height: string;
  user_gender: 0 | 1;
  activity_amount: 0 | 1 | 2;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InfoState = {
  user_name: '',
  user_age: '',
  user_height: '',
  user_gender: 0,
  activity_amount: 1,
  status: 'idle',
  error: null,
};

// 유저 정보를 서버에서 GET으로 가져오는 비동기 액션
export const fetchUserInfo = createAsyncThunk(
  'info/fetchUserInfo',
  async ( ) => {
    try {
      const response = await api.get('/AllEat/users/info');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return (error.response.data);
    }
  },
);

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    // 유저 정보를 동기적으로 설정할 때 사용
    setInfo(state, action: PayloadAction<Omit<InfoState, 'status' | 'error'>>) {
      return {...state, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        return {...state, ...action.payload};
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {setInfo} = infoSlice.actions;

export default infoSlice.reducer;

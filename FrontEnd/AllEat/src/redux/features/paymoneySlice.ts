import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_URL } from '@env';

// 페이머니 요청 액션 생성
export const paymonyRequest = createAsyncThunk(
  'auth/paymonyRequest',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACK_URL}/AllEat/paymony`,
        {}, // body가 비어있을 때는 빈 객체 전송
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        }
      );
      return response.data; // 필요한 경우 response에서 반환할 데이터
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '페이머니 요청 실패');
    }
  }
);

// 페이머니 상태 관리를 위한 Slice 생성
const paymonySlice = createSlice({
  name: 'paymony',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymonyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(paymonyRequest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      // .addCase(paymonyRequest.rejected, (state, action: PayloadAction<string>) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export default paymonySlice.reducer;

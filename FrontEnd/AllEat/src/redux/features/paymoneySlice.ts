// paymoneySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api'; // Axios 인스턴스 임포트
import { RootState } from '../../redux/store';
import { format } from 'date-fns';

// 페이머니 상태 타입 정의
interface PaymoneyState {
  loading: boolean;
  error: string | null;
  balance: number; // 잔액
  usedAmount: { [key: string]: number }; // 월별 사용 금액 관리
  success: boolean;
  accountCreated: boolean; // 계좌 개설 여부
}

// 초기 상태 정의
const initialState: PaymoneyState = {
  loading: false,
  error: null,
  balance: 0, // 잔액 초기화
  usedAmount: {}, // 사용 금액 초기화
  success: false,
  accountCreated: false, // 계좌 개설 여부 확인
};

// 페이머니 계좌 개설 액션 생성
export const createPaymoneyAccount = createAsyncThunk(
  'paymoney/createAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/AllEat/paymoney', {}); // 계좌 개설 요청
      return response.data; // 필요한 경우 응답 데이터 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '페이머니 계좌 개설 실패');
    }
  }
);

// 페이머니 잔액 조회 액션 생성
export const fetchPaymoneyBalance = createAsyncThunk(
  'paymoney/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/AllEat/paymoney'); // 잔액 조회 요청
      console.log('잔액 확인: ', response.data.balance)
      return response.data.balance; // 응답 데이터 중 잔액 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '잔액 조회 실패');
    }
  }
);


// 페이머니 충전 액션 생성
export const chargePaymoney = createAsyncThunk(
  'paymoney/charge',
  async (amount: number, { rejectWithValue }) => {
    try {
      const response = await api.put('/AllEat/paymoney', {
        amount,
        transaction_type: 0, // 충전
        restaurant_id: 1, // 고정 ID
      });
      console.log('충전 금액 확인: ', response.data.amount);
      return response.data.amount; // 반환된 잔액
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '충전 실패');
    }
  }
);

// 페이머니 송금 액션 생성
export const transferPaymoney = createAsyncThunk(
  'paymoney/transfer',
  async ({ amount, restaurant_id }: { amount: number; restaurant_id: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentBalance = state.paymoney.balance;

      // 잔액이 부족한 경우 에러 처리
      if (amount > currentBalance) {
        return rejectWithValue('잔액이 부족합니다.');
      }

      const response = await api.put('/AllEat/paymoney', {
        amount: -amount, // 음수값으로 송금
        transaction_type: 1, // 송금
        restaurant_id,
      });

      const currentMonth = format(new Date(), 'yyyy-MM'); // 현재 월
      const usedAmountForMonth = restaurant_id !== 1 ? amount : 0;
      // restaurant_id가 1이 아닐 때만 사용 금액으로 간주

      return { balance: response.data.amount, usedAmount: usedAmountForMonth, currentMonth };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '송금 실패');
    }
  }
);

// paymoney 상태 관리를 위한 Slice 생성
const paymoneySlice = createSlice({
  name: 'paymoney',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 계좌 개설
    builder
      .addCase(createPaymoneyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymoneyAccount.fulfilled, (state) => {
        state.loading = false;
        state.accountCreated = true; // 계좌 개설 성공 시 설정
      })
      .addCase(createPaymoneyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 잔액 조회
    builder
      .addCase(fetchPaymoneyBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymoneyBalance.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchPaymoneyBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 충전
    builder
      .addCase(chargePaymoney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chargePaymoney.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.balance = action.payload; // 업데이트된 잔액으로 변경
      })
      .addCase(chargePaymoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 송금
    builder
    .addCase(transferPaymoney.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(transferPaymoney.fulfilled, (state, action: PayloadAction<{ balance: number; usedAmount: number; currentMonth: string }>) => {
      state.loading = false;
      state.balance = action.payload.balance; // 업데이트된 잔액으로 변경
      // 현재 월의 사용 금액 업데이트
      const { currentMonth, usedAmount } = action.payload;
      state.usedAmount[currentMonth] = (state.usedAmount[currentMonth] || 0) + usedAmount;
      console.log('확인ㅇㅇㅇ', state.usedAmount[currentMonth])
    })
    .addCase(transferPaymoney.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default paymoneySlice.reducer;

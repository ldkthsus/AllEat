import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../../utils/api';

interface InfoState {
  email: string;
  user_name: string;
  user_age: string;
  user_height: string;
  user_gender: 0 | 1;
  activity_amount: 0 | 1 | 2;
  weight: number | null; // 첫 weight만 저장
  goal_weight: number | null; // goalWeight
  goal_cost: number | null; // goalCost
  breakfast_alarm: string | null; // 아침 알람
  lunch_alarm: string | null; // 점심 알람
  dinner_alarm: string | null; // 저녁 알람
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InfoState = {
  email: '',
  user_name: '',
  user_age: '',
  user_height: '',
  user_gender: 0,
  activity_amount: 1,
  weight: null, // weight 초기값
  goal_weight: null, // goalWeight 초기값
  goal_cost: null, // goalCost 초기값
  breakfast_alarm: null, // 아침 알람 초기값
  lunch_alarm: null, // 점심 알람 초기값
  dinner_alarm: null, // 저녁 알람 초기값
  status: 'idle',
  error: null,
};

// 유저 정보를 서버에서 GET으로 가져오는 비동기 액션
export const fetchUserInfo = createAsyncThunk(
  'info/fetchUserInfo',
  async () => {
    try {
      const response = await api.get('/AllEat/users/info');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
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
        const {
          email,
          user_name,
          user_age,
          user_height,
          user_gender,
          activity_amount,
          weights,
          goals,
          alarms,
        } = action.payload;

        // 첫 번째 weight만 가져옴
        const weight = weights && weights.length > 0 ? weights[0].weight : null;

        // goals에서 goal_weight와 goal_cost 추출
        const goal_weight = goals?.goalWeight || null;
        const goal_cost = goals?.goalCost || null;

        // alarms에서 각 알람 시간을 추출
        const breakfast_alarm = alarms?.breakfastAlarm || null;
        const lunch_alarm = alarms?.lunchAlarm || null;
        const dinner_alarm = alarms?.dinnerAlarm || null;

        // 상태 업데이트
        return {
          ...state,
          email,
          user_name,
          user_age: String(user_age), // string으로 변환
          user_height: String(user_height), // string으로 변환
          user_gender,
          activity_amount,
          weight,
          goal_weight,
          goal_cost,
          breakfast_alarm,
          lunch_alarm,
          dinner_alarm,
          status: 'succeeded',
        };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {setInfo} = infoSlice.actions;

export default infoSlice.reducer;

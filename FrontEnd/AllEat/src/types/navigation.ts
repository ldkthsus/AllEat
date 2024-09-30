// src/types/navigationTypes.ts
interface DiaryIds {
  BREAKFAST: number | null;
  LUNCH: number | null;
  DINNER: number | null;
  SNACK: number | null;
}
export type RootStackParamList = {
  Home: {isUpdated?: boolean};
  DiaryCreate: {date: string; meals: string; diaryId?: DiaryIds};
  SignIn: undefined;
  SignUp: undefined;
  Intro: undefined;
  Initial: undefined;
  MyPage: undefined;
  MyPageUpdate: undefined;
  Agreement: undefined;
  Paymoney: undefined;
  Report: undefined;
  PaymoneyDetail: undefined;
  // 다른 화면도 추가할 수 있습니다.
};

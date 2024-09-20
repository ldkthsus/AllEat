export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export interface SignupData {
  email: string;
  username: string;
  password1: string;
  password2: string;
  user_height: number;
  user_gender: number;
  user_age: number;
  user_activity: number;
}

export interface SignupState {
  loading: boolean;
  error: string | null;
}

interface SignupRequestAction {
  type: typeof SIGNUP_REQUEST;
}

interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
}

interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export type SignupActionTypes = SignupRequestAction | SignupSuccessAction | SignupFailureAction;

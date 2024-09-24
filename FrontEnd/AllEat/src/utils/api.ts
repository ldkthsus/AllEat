import axios from 'axios';
import {store} from '../redux/store'; // Redux 스토어 경로에 맞게 설정하세요
import {BACK_URL} from '@env';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BACK_URL, // 여기에 API의 기본 URL을 넣습니다.
  timeout: 5000, // 요청 타임아웃을 설정합니다.
});

// Axios 요청 인터셉터: 요청 전에 헤더에 토큰 추가
api.interceptors.request.use(
  config => {
    // Redux 스토어에서 토큰 가져오기
    const token = store.getState().auth.token; // auth는 리덕스 슬라이스 이름

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Bearer 토큰 설정
    }
    // console.log('token : ', token, config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Axios 응답 인터셉터 (선택 사항): 응답 처리 및 에러 핸들링
api.interceptors.response.use(
  response => {
    // 응답 성공 처리
    return response;
  },
  error => {
    // 에러 처리 (예: 401 에러 처리 등)
    if (error.response && error.response.status === 401) {
      // 토큰 만료 등 처리
      console.error('Unauthorized, logging out...', error);
    }
    return Promise.reject(error);
  },
);
export default api;

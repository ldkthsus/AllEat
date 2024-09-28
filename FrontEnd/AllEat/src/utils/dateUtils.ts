// utils/dateUtils.ts

import {format} from 'date-fns';

export const formatDate = (date: Date): string => {
  const today = new Date();
  if (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return '오늘'; // 오늘이면 "오늘"로 표시
  } else if (
    today.getDate() - 1 === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return '어제';
  } else if (
    today.getDate() + 1 === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return '내일';
  }
  return format(date, 'MM/dd'); // 그 외에는 날짜를 yyyy/MM/dd 형식으로 표시
};

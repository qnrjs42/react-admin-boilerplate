import axios, { type AxiosError } from 'axios';

export const utilIsAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

export const utilAxiosError = (error: Error): string => {
  const defaultErrorMessage = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

  if (axios.isAxiosError(error)) {
    return error.response?.data.data.description?.codeMessage ?? defaultErrorMessage;
  }

  return error?.message || defaultErrorMessage;
};

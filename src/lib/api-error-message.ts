import axios from 'axios';

const hasMessage = (value: unknown): value is { message: string } =>
  typeof value === 'object' && value !== null && 'message' in value && typeof value.message === 'string';

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error) && hasMessage(error.response?.data)) {
    return error.response.data.message;
  }

  return fallback;
};

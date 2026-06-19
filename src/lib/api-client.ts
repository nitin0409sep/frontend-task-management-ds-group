import axios from 'axios';
import { env } from '../config/env';
import { authToken } from './auth-token';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = authToken.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

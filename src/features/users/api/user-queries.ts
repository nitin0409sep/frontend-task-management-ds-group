import { useQuery } from '@tanstack/react-query';
import { userApi } from './user-api';

export const useUsersQuery = (enabled: boolean) =>
  useQuery({
    queryKey: ['users'],
    queryFn: userApi.list,
    enabled,
  });

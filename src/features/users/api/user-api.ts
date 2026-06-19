import { apiClient } from '../../../lib/api-client';
import type { UserOption } from '../../../types/user';

export const userApi = {
  async list() {
    const { data } = await apiClient.get<{ users: UserOption[] }>('/users');
    return data.users;
  },
};

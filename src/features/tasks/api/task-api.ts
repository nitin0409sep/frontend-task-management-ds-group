import { apiClient } from '../../../lib/api-client';
import type { Task, TaskFilters, TaskInput, TaskListResponse, TaskStatus } from '../../../types/task';

const cleanTaskFilters = (filters: TaskFilters) =>
  Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined));

export const taskApi = {
  async list(filters: TaskFilters) {
    const { data } = await apiClient.get<TaskListResponse>('/tasks', { params: cleanTaskFilters(filters) });
    return data;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<{ task: Task }>(`/tasks/${id}`);
    return data.task;
  },

  async create(input: TaskInput) {
    const { data } = await apiClient.post<{ task: Task }>('/tasks', input);
    return data.task;
  },

  async update(id: string, input: Partial<TaskInput>) {
    const { data } = await apiClient.put<{ task: Task }>(`/tasks/${id}`, input);
    return data.task;
  },

  async updateStatus(id: string, status: TaskStatus) {
    const { data } = await apiClient.patch<{ task: Task }>(`/tasks/${id}/status`, { status });
    return data.task;
  },

  async remove(id: string) {
    await apiClient.delete(`/tasks/${id}`);
  },
};

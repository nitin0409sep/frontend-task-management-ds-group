import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../lib/query-client';
import { taskApi } from './task-api';
import type { TaskFilters, TaskInput, TaskStatus } from '../../../types/task';

export const taskKeys = {
  list: (filters: TaskFilters) => ['tasks', filters] as const,
  detail: (id: string) => ['tasks', 'detail', id] as const,
};

const invalidateTasks = () => queryClient.invalidateQueries({ queryKey: ['tasks'] });

export const useTasksQuery = (filters: TaskFilters) =>
  useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => taskApi.list(filters),
  });

export const useInfiniteTasksQuery = (filters: TaskFilters, limit = 10) =>
  useInfiniteQuery({
    queryKey: taskKeys.list({ ...filters, limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => taskApi.list({ ...filters, page: pageParam, limit }),
    getNextPageParam: (lastPage) => (lastPage.tasks.length === lastPage.limit ? lastPage.page + 1 : undefined),
  });

export const useTaskQuery = (id?: string) =>
  useQuery({
    queryKey: taskKeys.detail(id ?? ''),
    queryFn: () => taskApi.getById(id!),
    enabled: Boolean(id),
  });

export const useCreateTaskMutation = () =>
  useMutation({ mutationFn: taskApi.create, onSuccess: invalidateTasks });

export const useUpdateTaskMutation = () =>
  useMutation({ mutationFn: ({ id, input }: { id: string; input: Partial<TaskInput> }) => taskApi.update(id, input), onSuccess: invalidateTasks });

export const useUpdateTaskStatusMutation = () =>
  useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => taskApi.updateStatus(id, status),
    onSuccess: (task) => {
      queryClient.setQueryData(taskKeys.detail(task.id), task);
      void invalidateTasks();
    },
  });

export const useDeleteTaskMutation = () =>
  useMutation({ mutationFn: taskApi.remove, onSuccess: invalidateTasks });

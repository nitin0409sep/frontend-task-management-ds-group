export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  createdBy: string;
  dueDate?: string | null;
  assigneeName?: string;
};

export type TaskFilters = {
  search?: string;
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  sortBy?: 'priority' | 'dueDate' | '';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type TaskListResponse = {
  tasks: Task[];
  page: number;
  limit: number;
};

export type TaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate: string;
};

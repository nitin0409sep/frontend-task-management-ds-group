import { Add, FilterList } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState, type UIEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';
import { EmptyState } from '../../../components/ui/empty-state';
import { TaskListSkeleton } from '../../../components/ui/task-list-skeleton';
import { routes } from '../../../config/routes';
import { useAuth } from '../../auth/context/use-auth';
import { useDeleteTaskMutation, useInfiniteTasksQuery, useUpdateTaskStatusMutation } from '../api/task-queries';
import { TaskCardList } from '../components/task-card';
import { TaskFiltersBar } from '../components/task-filters';
import { TaskStatusDialog } from '../components/task-status-dialog';
import { TaskTable } from '../components/task-table';
import type { Task, TaskFilters, TaskStatus } from '../../../types/task';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilters>({ sortOrder: 'desc' });
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>();
  const [taskToUpdateStatus, setTaskToUpdateStatus] = useState<Task | undefined>();
  const tasks = useInfiniteTasksQuery(filters);
  const deleteTask = useDeleteTaskMutation();
  const updateStatus = useUpdateTaskStatusMutation();
  const isAdmin = user?.role === 'admin';
  const taskList = useMemo(() => tasks.data?.pages.flatMap((page) => page.tasks) ?? [], [tasks.data]);

  const goToNewTask = useCallback(() => navigate(routes.newTask), [navigate]);
  const viewTask = useCallback((task: Task) => navigate(routes.viewTask(task.id)), [navigate]);
  const editTask = useCallback((task: Task) => {
    if (isAdmin) {
      navigate(routes.editTask(task.id));
      return;
    }

    setTaskToUpdateStatus(task);
  }, [isAdmin, navigate]);
  const closeDeleteDialog = useCallback(() => setTaskToDelete(undefined), []);

  const closeStatusDialog = useCallback(() => {
    if (!updateStatus.isPending) setTaskToUpdateStatus(undefined);
  }, [updateStatus.isPending]);

  const changeTaskStatus = useCallback(async (task: Task, status: TaskStatus) => {
    if (task.status === status) return;

    try {
      await updateStatus.mutateAsync({ id: task.id, status });
      toast.success('Status updated');
      setTaskToUpdateStatus(undefined);
    } catch {
      toast.error('Could not update status');
    }
  }, [updateStatus]);

  const loadMoreTasks = useCallback(() => {
    if (tasks.hasNextPage && !tasks.isFetchingNextPage) {
      void tasks.fetchNextPage();
    }
  }, [tasks]);

  const handleListScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const bottomOffset = target.scrollHeight - target.scrollTop - target.clientHeight;
    if (bottomOffset < 120) loadMoreTasks();
  }, [loadMoreTasks]);

  const confirmDelete = useCallback(async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask.mutateAsync(taskToDelete.id);
      toast.success('Task deleted');
      setTaskToDelete(undefined);
    } catch {
      toast.error('Could not delete task');
    }
  }, [deleteTask, taskToDelete]);

  return (
    <Stack spacing={{ xs: 2, md: 3 }} sx={{ height: { xs: 'calc(100dvh - 116px)', md: 'calc(100dvh - 132px)' }, minHeight: 0, overflow: 'hidden' }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, border: 1, borderColor: 'divider', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 1.5 }} sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
              <FilterList color="action" fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Filters</Typography>
            </Stack>
            {isAdmin && (
              <Button startIcon={<Add />} variant="contained" onClick={goToNewTask} sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}>
                New task
              </Button>
            )}
          </Stack>
          <TaskFiltersBar filters={filters} onChange={setFilters} />
        </Stack>
      </Paper>

      <Box
        className="task-list-scroll"
        onScroll={handleListScroll}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          borderRadius: 1,
          scrollbarGutter: 'stable',
        }}
      >
        <Stack spacing={0}>
          {tasks.isLoading && <TaskListSkeleton />}
          {tasks.isError && <Alert severity="error">Could not load tasks</Alert>}
          {!tasks.isLoading && !tasks.isError && taskList.length === 0 && (
            <EmptyState title="No tasks found" description="Adjust your filters to see assigned work here." />
          )}
          {taskList.length > 0 && (
            <>
              <TaskTable tasks={taskList} canManage={isAdmin} onView={viewTask} onEdit={editTask} onDelete={setTaskToDelete} />
              <TaskCardList tasks={taskList} canManage={isAdmin} onView={viewTask} onEdit={editTask} onDelete={setTaskToDelete} />
            </>
          )}
          {(tasks.isFetchingNextPage || (tasks.isFetching && !tasks.isLoading)) && (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', color: 'text.secondary', py: 1 }}>
              <CircularProgress size={18} />
              <Typography variant="body2">Loading tasks</Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      <TaskStatusDialog
        task={taskToUpdateStatus}
        loading={updateStatus.isPending}
        onClose={closeStatusDialog}
        onSubmit={changeTaskStatus}
      />

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        title="Delete task"
        description={`Delete ${taskToDelete?.title ?? 'this task'}? This action cannot be undone.`}
        confirmText="Delete"
        destructive
        loading={deleteTask.isPending}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

import { ArrowBack } from '@mui/icons-material';
import { Alert, Box, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';
import { routes } from '../../../config/routes';
import { useAuth } from '../../auth/context/use-auth';
import { useCreateTaskMutation, useTaskQuery, useUpdateTaskMutation } from '../api/task-queries';
import { TaskForm } from '../components/task-form';
import { TaskFormSkeleton } from '../components/task-form-skeleton';
import type { TaskInput } from '../../../types/task';

type TaskEditorPageProps = {
  mode: 'create' | 'edit';
};

export const TaskEditorPage = memo(function TaskEditorPage({ mode }: TaskEditorPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const task = useTaskQuery(mode === 'edit' ? id : undefined);
  const [pendingUpdate, setPendingUpdate] = useState<TaskInput | null>(null);

  const isEdit = mode === 'edit';
  const isAdmin = user?.role === 'admin';
  const isSaving = createTask.isPending || updateTask.isPending;

  const copy = useMemo(
    () => ({
      title: isEdit ? 'Edit task' : 'New task',
      subtitle: isEdit ? 'Update task details' : 'Add a task to your workspace',
      submitLabel: isEdit ? 'Update task' : 'Create task',
      success: isEdit ? 'Task updated' : 'Task created',
      error: isEdit ? 'Could not update task' : 'Could not create task',
    }),
    [isEdit],
  );

  const goDashboard = useCallback(() => navigate(routes.dashboard), [navigate]);

  const saveTask = useCallback(
    async (input: TaskInput) => {
      try {
        if (isEdit) {
          if (!id) return;
          await updateTask.mutateAsync({ id, input });
        } else {
          await createTask.mutateAsync(input);
        }

        toast.success(copy.success);
        navigate(routes.dashboard);
      } catch {
        toast.error(copy.error);
      }
    },
    [copy.error, copy.success, createTask, id, isEdit, navigate, updateTask],
  );

  const handleSubmit = useCallback(
    async (input: TaskInput) => {
      if (isEdit) {
        setPendingUpdate(input);
        return;
      }

      await saveTask(input);
    },
    [isEdit, saveTask],
  );

  const closeUpdateConfirm = useCallback(() => {
    if (!updateTask.isPending) setPendingUpdate(null);
  }, [updateTask.isPending]);

  const confirmUpdate = useCallback(async () => {
    if (!pendingUpdate) return;
    await saveTask(pendingUpdate);
    setPendingUpdate(null);
  }, [pendingUpdate, saveTask]);

  return (
    <Stack spacing={3} sx={{ maxWidth: 820, mx: 'auto' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <Tooltip title="Dashboard">
          <IconButton onClick={goDashboard} aria-label="Go to dashboard" sx={{ mt: 0.25, color: 'text.secondary' }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>{copy.title}</Typography>
          <Typography color="text.secondary">{copy.subtitle}</Typography>
        </Box>
      </Stack>

      {task.isError && <Alert severity="error">Could not load task</Alert>}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          border: 1,
          borderColor: 'divider',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)',
        }}
      >
        {isEdit && task.isLoading ? <TaskFormSkeleton /> : !task.isError && (
          <TaskForm task={task.data} isAdmin={isAdmin} currentUser={user} isSaving={isSaving} submitLabel={copy.submitLabel} allowPastDueDate={isEdit} onSubmit={handleSubmit} />
        )}
      </Paper>

      <ConfirmDialog
        open={Boolean(pendingUpdate)}
        title="Update task"
        description="Are you sure you want to update this task?"
        confirmText="Update task"
        loading={updateTask.isPending}
        onClose={closeUpdateConfirm}
        onConfirm={confirmUpdate}
      />
    </Stack>
  );
});

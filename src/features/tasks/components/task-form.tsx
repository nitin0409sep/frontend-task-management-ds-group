import { memo, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { ButtonProgressLabel } from '../../../components/ui/button-progress-label';
import { zodResolver } from '../../../lib/zod-resolver';
import { AssigneeSelect } from '../../users/components/assignee-select';
import type { AuthUser } from '../../../types/auth';
import type { Task, TaskInput } from '../../../types/task';
import { createTaskFormSchema } from '../validation/task-schema';

const today = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

const emptyTask = (): TaskInput => ({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assigneeId: '',
  dueDate: today(),
});

type TaskFormProps = {
  task?: Task;
  isAdmin: boolean;
  currentUser?: AuthUser;
  isSaving: boolean;
  submitLabel?: string;
  allowPastDueDate?: boolean;
  onSubmit: (input: TaskInput) => void;
};

export const TaskForm = memo(function TaskForm({ task, isAdmin, currentUser, isSaving, submitLabel = 'Save', allowPastDueDate = false, onSubmit }: TaskFormProps) {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({ defaultValues: emptyTask(), resolver: zodResolver(createTaskFormSchema({ allowPastDueDate, requireAssignee: isAdmin, currentUserId: currentUser?.id })) });

  useEffect(() => {
    reset(
      task
        ? {
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            priority: task.priority,
            assigneeId: task.assigneeId,
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : today(),
          }
        : emptyTask(),
    );
  }, [reset, task]);

  const openDatePicker = () => {
    if (isSaving) return;
    dateInputRef.current?.showPicker?.();
    dateInputRef.current?.focus();
  };

  const submitForm = (values: TaskInput) => {
    onSubmit({
      ...values,
      description: values.description.trim(),
      assigneeId: values.assigneeId || undefined,
      dueDate: values.dueDate,
    });
  };

  return (
    <Stack component="form" id="task-form" spacing={2.5} onSubmit={handleSubmit(submitForm)} noValidate>
      <TextField
        label="Title"
        required
        disabled={isSaving}
        error={Boolean(errors.title)}
        helperText={errors.title?.message}
        {...register('title')}
      />
      <TextField
        label="Description"
        required
        multiline
        rows={4}
        disabled={isSaving}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        {...register('description')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <TextField select label="Status" required disabled={isSaving} error={Boolean(fieldState.error)} helperText={fieldState.error?.message} {...field}>
            <MenuItem value="todo">To do</MenuItem>
            <MenuItem value="in_progress">In progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field, fieldState }) => (
          <TextField select label="Priority" required disabled={isSaving} error={Boolean(fieldState.error)} helperText={fieldState.error?.message} {...field}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="assigneeId"
        control={control}
        render={({ field }) => (
          <AssigneeSelect
            enabled={isAdmin}
            disabled={isSaving}
            required
            value={field.value}
            onChange={field.onChange}
            error={Boolean(errors.assigneeId)}
            helperText={errors.assigneeId?.message}
            excludeUserId={currentUser?.id}
          />
        )}
      />
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <TextField
            label="Due date"
            type="date"
            required
            error={Boolean(errors.dueDate)}
            helperText={errors.dueDate?.message}
            disabled={isSaving}
            value={field.value ?? ''}
            onChange={field.onChange}
            onClick={openDatePicker}
            inputRef={(input) => {
              field.ref(input);
              dateInputRef.current = input;
            }}
            slotProps={{ input: { inputProps: allowPastDueDate ? {} : { min: today() } }, inputLabel: { shrink: true } }}
            sx={{
              '& .MuiInputBase-root': { cursor: isSaving ? 'default' : 'pointer' },
              '& input': { cursor: isSaving ? 'default' : 'pointer' },
            }}
          />
        )}
      />

      <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isSaving}>
          <ButtonProgressLabel loading={isSaving}>{submitLabel}</ButtonProgressLabel>
        </Button>
      </Stack>
    </Stack>
  );
});

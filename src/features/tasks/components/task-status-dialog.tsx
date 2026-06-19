import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { ButtonProgressLabel } from '../../../components/ui/button-progress-label';
import type { Task, TaskStatus } from '../../../types/task';
import { TaskStatusSelect } from './task-status-select';

type TaskStatusDialogProps = {
  task?: Task;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (task: Task, status: TaskStatus) => void;
};

const TaskStatusDialogContent = ({ task, loading, onClose, onSubmit }: Required<TaskStatusDialogProps>) => {
  const [status, setStatus] = useState<TaskStatus>(task.status);

  return (
    <>
      <DialogTitle>Update task status</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TaskStatusSelect value={status} disabled={loading} fullWidth onChange={setStatus} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" disabled={loading || status === task.status} onClick={() => onSubmit(task, status)}>
          <ButtonProgressLabel loading={loading}>Update status</ButtonProgressLabel>
        </Button>
      </DialogActions>
    </>
  );
};

export const TaskStatusDialog = ({ task, loading = false, onClose, onSubmit }: TaskStatusDialogProps) => (
  <Dialog open={Boolean(task)} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
    {task && <TaskStatusDialogContent key={`${task.id}-${task.status}`} task={task} loading={loading} onClose={onClose} onSubmit={onSubmit} />}
  </Dialog>
);

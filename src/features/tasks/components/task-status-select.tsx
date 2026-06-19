import { MenuItem, TextField } from '@mui/material';
import type { TaskStatus } from '../../../types/task';

const labels: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const TaskStatusSelect = ({ value, disabled, fullWidth = false, onChange }: { value: TaskStatus; disabled?: boolean; fullWidth?: boolean; onChange: (status: TaskStatus) => void }) => (
  <TextField
    select
    size="small"
    value={value}
    disabled={disabled}
    onChange={(event) => onChange(event.target.value as TaskStatus)}
    fullWidth={fullWidth}
    sx={{ minWidth: 132 }}
  >
    {(Object.keys(labels) as TaskStatus[]).map((status) => (
      <MenuItem key={status} value={status}>{labels[status]}</MenuItem>
    ))}
  </TextField>
);

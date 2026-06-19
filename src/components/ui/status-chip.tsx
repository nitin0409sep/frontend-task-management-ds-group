import { Chip } from '@mui/material';
import type { TaskStatus } from '../../types/task';

const labels: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const StatusChip = ({ status }: { status: TaskStatus }) => <Chip size="small" label={labels[status]} />;

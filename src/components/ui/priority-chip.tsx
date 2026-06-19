import { Chip } from '@mui/material';
import type { TaskPriority } from '../../types/task';

const colors: Record<TaskPriority, 'default' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'warning',
  high: 'error',
};

export const PriorityChip = ({ priority }: { priority: TaskPriority }) => (
  <Chip size="small" color={colors[priority]} label={priority} sx={{ textTransform: 'capitalize' }} />
);

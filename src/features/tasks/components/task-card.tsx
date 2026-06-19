import { memo } from 'react';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { PriorityChip } from '../../../components/ui/priority-chip';
import { StatusChip } from '../../../components/ui/status-chip';
import type { Task } from '../../../types/task';

type TaskListProps = {
  tasks: Task[];
  canManage: boolean;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export const TaskCardList = memo(function TaskCardList({ tasks, canManage, onView, onEdit, onDelete }: TaskListProps) {
  return (
    <Stack spacing={1.5} sx={{ display: { md: 'none' } }}>
      {tasks.map((task) => (
        <Card key={task.id} variant="outlined" sx={{ bgcolor: 'background.paper' }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }} spacing={1}>
                <Tooltip title={task.title} placement="top-start"><Typography noWrap sx={{ fontWeight: 800, pr: 1, minWidth: 0 }}>{task.title}</Typography></Tooltip>
                <Stack direction="row">
                  <IconButton size="small" onClick={() => onView(task)} aria-label="View task"><Visibility fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => onEdit(task)} aria-label={canManage ? 'Edit task' : 'Update status'}><Edit fontSize="small" /></IconButton>
                  {canManage && <IconButton size="small" color="error" onClick={() => onDelete(task)} aria-label="Delete task"><Delete fontSize="small" /></IconButton>}
                </Stack>
              </Stack>
              {task.description && <Tooltip title={task.description} placement="top-start"><Typography noWrap color="text.secondary">{task.description}</Typography></Tooltip>}
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                <StatusChip status={task.status} />
                <PriorityChip priority={task.priority} />
              </Stack>
              <Typography variant="body2" color="text.secondary">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
});

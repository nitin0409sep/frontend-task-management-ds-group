import { memo } from 'react';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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

export const TaskTable = memo(function TaskTable({ tasks, canManage, onView, onEdit, onDelete }: TaskListProps) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ display: { xs: 'none', md: 'block' }, border: 1, borderColor: 'divider', overflow: 'visible' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Task</TableCell>
            <TableCell sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Due date</TableCell>
            <TableCell align="right" sx={{ fontWeight: 800, bgcolor: 'background.paper', top: 0, zIndex: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} hover>
              <TableCell sx={{ width: 360, maxWidth: 360 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 700 }}>{task.title}</Typography>
                  {task.description && (
                    <Typography variant="body2" color="text.secondary" noWrap>{task.description}</Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell><StatusChip status={task.status} /></TableCell>
              <TableCell><PriorityChip priority={task.priority} /></TableCell>
              <TableCell sx={{ maxWidth: 180 }}><Typography noWrap>{task.assigneeName ?? '-'}</Typography></TableCell>
              <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                  <IconButton size="small" onClick={() => onView(task)} aria-label="View task"><Visibility fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => onEdit(task)} aria-label={canManage ? 'Edit task' : 'Update status'}><Edit fontSize="small" /></IconButton>
                  {canManage && <IconButton size="small" color="error" onClick={() => onDelete(task)} aria-label="Delete task"><Delete fontSize="small" /></IconButton>}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

import { ArrowBack, CalendarToday, Edit, PersonOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Divider, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useCallback, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PriorityChip } from '../../../components/ui/priority-chip';
import { StatusChip } from '../../../components/ui/status-chip';
import { routes } from '../../../config/routes';
import { useAuth } from '../../auth/context/use-auth';
import { useTaskQuery, useUpdateTaskStatusMutation } from '../api/task-queries';
import { TaskStatusDialog } from '../components/task-status-dialog';
import type { TaskStatus } from '../../../types/task';

const DetailTile = ({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) => (
  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', height: '100%' }}>
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>{label}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Stack>
  </Paper>
);

export const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const task = useTaskQuery(id);
  const updateStatus = useUpdateTaskStatusMutation();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const goDashboard = useCallback(() => navigate(routes.dashboard), [navigate]);
  const isAdmin = user?.role === 'admin';

  const changeStatus = useCallback(async (status: TaskStatus) => {
    if (!task.data || task.data.status === status) return;

    try {
      await updateStatus.mutateAsync({ id: task.data.id, status });
      toast.success('Status updated');
      setStatusDialogOpen(false);
    } catch {
      toast.error('Could not update status');
    }
  }, [task.data, updateStatus]);

  return (
    <Stack spacing={3} sx={{ maxWidth: 880, mx: 'auto' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Tooltip title="Dashboard">
          <IconButton onClick={goDashboard} aria-label="Go to dashboard" sx={{ color: 'text.secondary' }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>Task details</Typography>
          <Typography color="text.secondary">Read-only view of your assigned work</Typography>
        </Box>
      </Stack>

      {task.isLoading && (
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3, md: 3.5 }, border: 1, borderColor: 'divider' }}>
          <Stack spacing={2.5}>
            <Skeleton height={44} width="55%" />
            <Skeleton height={28} width="35%" />
            <Skeleton variant="rounded" height={128} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Skeleton variant="rounded" height={76} sx={{ flex: 1 }} />
              <Skeleton variant="rounded" height={76} sx={{ flex: 1 }} />
            </Stack>
          </Stack>
        </Paper>
      )}

      {task.isError && <Alert severity="error">Could not load task</Alert>}

      {task.data && (
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            border: 1,
            borderColor: 'divider',
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.06)',
          }}
        >
          <Box sx={{ p: { xs: 2.5, sm: 3, md: 3.5 }, bgcolor: 'background.paper' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'flex-start' } }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{task.data.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.75 }}>Assigned to {task.data.assigneeName ?? 'you'}</Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                <StatusChip status={task.data.status} />
                <PriorityChip priority={task.data.priority} />
              </Stack>
            </Stack>
            {!isAdmin && (
              <Button startIcon={<Edit />} variant="outlined" onClick={() => setStatusDialogOpen(true)} sx={{ mt: 2 }}>
                Edit status
              </Button>
            )}
          </Box>

          <Divider />

          <Stack spacing={3} sx={{ p: { xs: 2.5, sm: 3, md: 3.5 } }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1 }}>Description</Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {task.data.description || 'No description provided.'}
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <DetailTile icon={<PersonOutlined fontSize="small" />} label="Assignee" value={task.data.assigneeName ?? '-'} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailTile icon={<CalendarToday fontSize="small" />} label="Due date" value={task.data.dueDate ? new Date(task.data.dueDate).toLocaleDateString() : '-'} />
              </Box>
            </Stack>
          </Stack>
        </Paper>
      )}
      <TaskStatusDialog
        task={statusDialogOpen ? task.data : undefined}
        loading={updateStatus.isPending}
        onClose={() => !updateStatus.isPending && setStatusDialogOpen(false)}
        onSubmit={(_task, status) => void changeStatus(status)}
      />
    </Stack>
  );
};

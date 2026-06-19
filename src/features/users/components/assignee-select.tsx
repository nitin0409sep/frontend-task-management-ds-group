import { MenuItem, Skeleton, TextField } from '@mui/material';
import { useUsersQuery } from '../api/user-queries';

type AssigneeSelectProps = {
  value?: string;
  onChange: (value: string) => void;
  enabled: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  excludeUserId?: string;
};

export const AssigneeSelect = ({ value, onChange, enabled, disabled = false, required = false, error = false, helperText, excludeUserId }: AssigneeSelectProps) => {
  const users = useUsersQuery(enabled);

  if (!enabled) return null;
  if (users.isLoading) return <Skeleton variant="rounded" height={56} />;

  const assignableUsers = users.data?.filter((user) => user.id !== excludeUserId) ?? [];

  return (
    <TextField
      select
      label="Assignee"
      required={required}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      error={error}
      helperText={helperText}
      fullWidth
    >
      {assignableUsers.map((user) => (
        <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
      ))}
    </TextField>
  );
};

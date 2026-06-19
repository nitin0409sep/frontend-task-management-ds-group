import { memo } from 'react';
import { Skeleton, Stack } from '@mui/material';

export const TaskFormSkeleton = memo(function TaskFormSkeleton() {
  return (
    <Stack spacing={2.5}>
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={124} />
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={154} height={38} />
      </Stack>
    </Stack>
  );
});

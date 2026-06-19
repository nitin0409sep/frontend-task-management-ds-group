import { CircularProgress, Stack } from '@mui/material';

export const ButtonProgressLabel = ({ loading, children }: { loading: boolean; children: string }) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', minWidth: 120 }}>
    {loading && <CircularProgress size={18} color="inherit" />}
    <span>{children}</span>
  </Stack>
);

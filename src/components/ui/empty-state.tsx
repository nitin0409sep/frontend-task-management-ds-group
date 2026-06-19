import { AssignmentTurnedInOutlined } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

export const EmptyState = ({ title, description, actionLabel, onAction }: { title: string; description?: string; actionLabel?: string; onAction?: () => void }) => (
  <Paper variant="outlined" sx={{ py: { xs: 6, md: 8 }, px: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
    <Stack spacing={2} sx={{ alignItems: 'center', maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ width: 64, height: 64, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'action.hover', color: 'primary.main' }}>
        <AssignmentTurnedInOutlined fontSize="large" />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>
        {description && <Typography color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>}
      </Box>
      {actionLabel && onAction && <Button variant="contained" onClick={onAction}>{actionLabel}</Button>}
    </Stack>
  </Paper>
);

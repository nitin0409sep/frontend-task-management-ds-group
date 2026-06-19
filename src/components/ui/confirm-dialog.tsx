import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  destructive?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  destructive = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={loading}>{cancelText}</Button>
      <Button color={destructive ? 'error' : 'primary'} variant="contained" onClick={onConfirm} disabled={loading} autoFocus>
        {loading ? <CircularProgress size={20} color="inherit" /> : confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

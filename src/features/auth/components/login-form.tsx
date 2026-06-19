import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { ButtonProgressLabel } from '../../../components/ui/button-progress-label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { zodResolver } from '../../../lib/zod-resolver';
import { useAuth } from '../context/use-auth';
import { useLoginMutation } from '../api/auth-queries';
import { loginFormSchema } from '../validation/auth-schema';

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const login = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login.mutateAsync(values);
      auth.setSession(response);
      toast.success('Signed in successfully');
      navigate(routes.dashboard);
    } catch {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
      {login.isError && <Alert severity="error">Invalid email or password</Alert>}
      <TextField
        label="Email"
        type="email"
        required
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        required
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        {...register('password')}
        slotProps={{ input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        } } }
      />
      <Button type="submit" variant="contained" size="large" disabled={login.isPending}>
        <ButtonProgressLabel loading={login.isPending}>Sign in</ButtonProgressLabel>
      </Button>
    </Stack>
  );
};

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { ButtonProgressLabel } from '../../../components/ui/button-progress-label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { getApiErrorMessage } from '../../../lib/api-error-message';
import { zodResolver } from '../../../lib/zod-resolver';
import { useRegisterMutation } from '../api/auth-queries';
import { registerFormSchema } from '../validation/auth-schema';
import { useAuth } from '../context/use-auth';

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const registerUser = useRegisterMutation();
  const registerErrorMessage = registerUser.isError ? getApiErrorMessage(registerUser.error, 'Could not create the account') : undefined;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { name: '', email: '', password: '' },
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await registerUser.mutateAsync(values);
      auth.setSession(response);
      toast.success('Account created');
      navigate(routes.dashboard);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not create the account'));
    }
  };

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
      {registerErrorMessage && <Alert severity="error">{registerErrorMessage}</Alert>}
      <TextField
        label="Name"
        required
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        {...register('name')}
      />
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
      <Button type="submit" variant="contained" size="large" disabled={registerUser.isPending}>
        <ButtonProgressLabel loading={registerUser.isPending}>Create account</ButtonProgressLabel>
      </Button>
    </Stack>
  );
};

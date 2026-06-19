import { render, screen } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { vi } from 'vitest';
import { RegisterForm } from './register-form';

vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span data-testid="visibility-icon" />,
  VisibilityOff: () => <span data-testid="visibility-off-icon" />,
}));

vi.mock('@mui/material', () => ({
  Alert: ({ children }: PropsWithChildren) => <div role="alert">{children}</div>,
  Button: ({ children, disabled, type }: PropsWithChildren<{ disabled?: boolean; type?: 'button' | 'submit' | 'reset' }>) => (
    <button disabled={disabled} type={type ?? 'button'}>{children}</button>
  ),
  IconButton: ({ children, onClick, 'aria-label': ariaLabel }: PropsWithChildren<{ onClick?: () => void; 'aria-label'?: string }>) => (
    <button aria-label={ariaLabel} onClick={onClick} type="button">{children}</button>
  ),
  InputAdornment: ({ children }: PropsWithChildren) => <span>{children}</span>,
  Stack: ({ children, component: Component = 'div', ...props }: PropsWithChildren<{ component?: keyof JSX.IntrinsicElements }>) => (
    <Component {...props}>{children}</Component>
  ),
  TextField: ({ label, type = 'text', name, required, error, helperText, slotProps, ...props }: {
    label: string;
    type?: string;
    name?: string;
    required?: boolean;
    error?: boolean;
    helperText?: ReactNode;
    slotProps?: { input?: { endAdornment?: ReactNode } };
  }) => (
    <label>
      {label}
      <input aria-invalid={error ? 'true' : 'false'} name={name} required={required} type={type} {...props} />
      {slotProps?.input?.endAdornment}
      {helperText && <span>{helperText}</span>}
    </label>
  ),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../api/auth-queries', () => ({
  useRegisterMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

vi.mock('../context/use-auth', () => ({
  useAuth: () => ({
    setSession: vi.fn(),
  }),
}));

describe('RegisterForm', () => {
  it('renders registration fields and submit action', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});

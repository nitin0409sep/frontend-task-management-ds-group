import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerFormSchema = loginFormSchema.extend({
  name: z.string().trim().min(2, 'Name should be at least 2 characters').max(120, 'Name is too long'),
  password: z.string().min(8, 'Password should be at least 8 characters'),
});

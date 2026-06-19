import { z } from 'zod';

export const taskStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export const taskPrioritySchema = z.enum(['low', 'medium', 'high']);

const today = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

const validDate = (value: string) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`));
const isTodayOrFuture = (value: string) => value >= today();

export const createTaskFormSchema = (options: { allowPastDueDate?: boolean; requireAssignee?: boolean; currentUserId?: string } = {}) =>
  z.object({
    title: z.string().trim().min(2, 'Title should be at least 2 characters').max(160, 'Title is too long'),
    description: z.string().trim().min(1, 'Description is required').max(2000, 'Description is too long'),
    status: taskStatusSchema,
    priority: taskPrioritySchema,
    assigneeId: z.string().optional().superRefine((value, context) => {
      if (options.requireAssignee && !value) {
        context.addIssue({ code: 'custom', message: 'Assignee is required' });
      }

      if (value && value === options.currentUserId) {
        context.addIssue({ code: 'custom', message: 'Admins cannot assign tasks to themselves' });
      }
    }),
    dueDate: z
      .string()
      .min(1, 'Due date is required')
      .refine(validDate, 'Enter a valid due date')
      .refine((value) => options.allowPastDueDate || isTodayOrFuture(value), 'Due date cannot be in the past'),
  });

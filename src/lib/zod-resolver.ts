import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import type { z } from 'zod';

export const zodResolver = <Schema extends z.ZodType<FieldValues>>(schema: Schema): Resolver<z.infer<Schema>> =>
  async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};

    for (const issue of result.error.issues) {
      const name = issue.path[0];
      if (typeof name === 'string') {
        errors[name] = { type: issue.code, message: issue.message };
      }
    }

    return { values: {}, errors: errors as FieldErrors<z.infer<Schema>> };
  };

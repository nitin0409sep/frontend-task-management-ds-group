import type { TaskInput } from '../../types/task';

describe('task types', () => {
  it('accepts the basic task payload shape', () => {
    const task: TaskInput = { title: 'Review', description: 'Review the changes', status: 'todo', priority: 'medium', dueDate: '2026-06-19' };
    expect(task.title).toBe('Review');
  });
});

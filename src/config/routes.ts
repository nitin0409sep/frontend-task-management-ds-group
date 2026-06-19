export const routes = {
  login: '/login',
  register: '/register',
  dashboard: '/',
  newTask: '/tasks/new',
  viewTask: (id: string) => `/tasks/${id}`,
  editTask: (id: string) => `/tasks/${id}/edit`,
};

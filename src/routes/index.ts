interface Route {
  path: string
  name: string
  title: string
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'new-task',
    title: 'Create Task'
  },
  {
    path: '/tasks-manager',
    name: 'login',
    title: 'Manage Tasks'
  }
  // {
  //   path: '/login',
  //   name: 'login',
  //   title: 'Login'
  // }
]

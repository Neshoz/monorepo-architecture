import { IRoute } from '@mediatool-poc/tools';

export const routes: IRoute[] = [
  {
    path: '/hub',
    component: () => import('@mediatool-poc/hub-fe'),
  },
  {
    path: '/user/:userId',
    component: () => import('@mediatool-poc/user-profile')
  },
  {
    path: '/login',
    component: () => import('@mediatool-poc/login')
  },
]

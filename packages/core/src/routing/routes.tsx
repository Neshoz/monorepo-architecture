import { IRoute } from '@mediatool-poc/tools';

export const routes: IRoute[] = [
  {
    path: '/hub',
    component: () => import('@mediatool-poc/hub'),
  },
  {
    path: '/user/:userId',
    component: () => import('@mediatool-poc/user-profile')
  }
]

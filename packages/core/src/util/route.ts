import { lazy } from 'react'
import { IRoute, ComponentLoader } from '@mediatool-poc/tools'

export type FindRoutePredicate = (node: IRoute) => boolean

export function findRoute(routes: IRoute[], predicate: FindRoutePredicate) {
  const queue = routes.slice()
​
  while (queue.length) {
    const next = queue.pop();
​
    if (next && predicate(next)) {
      return next;
    }
    queue.push(...(next?.subRoutes ?? []));
  }
}

export function preloadComponent(loader: ComponentLoader) {
  const Component = lazy(loader)
  loader()
  return Component
}
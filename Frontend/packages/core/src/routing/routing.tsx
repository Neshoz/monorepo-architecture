import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IRoute, LazyPage } from '@mediatool-poc/tools'
interface IProps {
  routes: IRoute[]
  fallback?: string
}

export const Routing = ({ routes, fallback }: IProps) => {
  const fallbackRoute = routes.find(({ path }) => path === fallback)
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          render={props => (
            <LazyPage
              {...props}
              loader={route.component}
              subRoutes={route.subRoutes}
            />
          )}
        />
      ))}
      {fallbackRoute && (
        <Redirect exact to={fallback!} />
      )}
    </Switch>
  )
}
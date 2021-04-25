import React, { ReactNode } from 'react'
import { Route, Switch } from 'react-router-dom'
import { IRoute, LazyPage } from '@mediatool-poc/tools'

interface IProps {
  routes: IRoute[]
  fallback?: ReactNode
}

export const Routing = ({ routes, fallback }: IProps) => {
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
      {fallback && (<Route render={() => <>{fallback}</>}/>)}
    </Switch>
  )
}
import React from 'react'
import { NavLinkProps, NavLink as RouterNavLink, matchPath } from 'react-router-dom'
import { findRoute, preloadComponent } from '../../util/route'
import { routes } from '../../routing'

type Props = NavLinkProps

export const NavLink = (props: Props) => {
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const route = findRoute(routes, item => {
      const match = matchPath(props.to as string, { path: item.path, exact: true })
      return !!match
    })
    route && preloadComponent(route.component)
  }

  return (
    <RouterNavLink
      onMouseOver={handleMouseOver}
      { ...props }
    />
  )
}
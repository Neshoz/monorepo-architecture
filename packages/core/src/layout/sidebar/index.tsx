import React from 'react'
import { ISidebarItem } from '../../types'
import { NavLink } from '../../components'
import '../../styles/sidebar.css'

interface IProps {
  items: ISidebarItem[]
}

export const Sidebar = ({ items }: IProps) => {
  const isLinkActive = (item: ISidebarItem) => (_: any, location: any) =>
    location.pathname.startsWith(item.path)

  return (
    <div className="sidebar">
      {items.map(item => (
        <NavLink
          to={item.path}
          activeClassName="sidebar-item active"
          isActive={isLinkActive(item)}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}
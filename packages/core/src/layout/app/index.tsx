import React, { ReactNode } from 'react'
import '../../styles/app-layout.css'

interface IProps {
  sidebar: ReactNode
  main: ReactNode
}

export const AppLayout = ({ sidebar, main }: IProps) => (
  <div className="app-area">
    <div className="app-sidebar">
      {sidebar}
    </div>
    <div className="app-main">
      {main}
    </div>
  </div>
)
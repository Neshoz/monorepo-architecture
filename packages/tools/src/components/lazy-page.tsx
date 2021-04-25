import React, { Suspense, lazy, useMemo, ComponentType, ReactNode, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ComponentLoader, IRoute } from '../types'

type Props = {
  loader: ComponentLoader
  render?: (component: ComponentType<any>, props: any) => ReactNode
  subRoutes?: IRoute[]
} & RouteComponentProps

export const LazyPage = ({ loader, render, ...rest }: Props) => {
  const Component = useMemo(() => lazy(loader), [])

  return (
    <Suspense fallback={<p>Loading....</p>}>
      {render
        ? render(Component, { ...rest })
        : <Component {...rest} />
      }
    </Suspense>
  )
}
import { ComponentType } from "react";

export type ComponentLoader = () => Promise<{ default: ComponentType<any> }>

export interface IRoute {
  path: string | string[]
  component: ComponentLoader
  subRoutes?: IRoute[]
  exact?: boolean
}

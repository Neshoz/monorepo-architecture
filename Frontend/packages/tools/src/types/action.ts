import { Action } from "redux";
import { Entity } from "./entity";

export type BaseAction<T> = {
  entity: Entity
  payload: T
} & Action
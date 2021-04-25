import { BaseAction, Entity } from '../types'

export const createEntityAction = <T>(entity: Entity, payload: T): BaseAction<T> => ({
  type: `app/${entity}/created`,
  entity,
  payload
})
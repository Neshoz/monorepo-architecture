// @ts-nocheck
import { createStore, Action, combineReducers, Store } from 'redux'
import { Entity } from '@mediatool-poc/tools'

export type BaseAction<T> = {
  entity: Entity
  payload: T
} & Action

export type AppState = {
  idMap: Record<string, any>
  organization: {
    _id: string
    name: string
    campaigns: any[]
  }
}

export const pluralize = (str: string) => `${str}s`

const initialIdMap = {
  "123asd": {
    _id: "123asd",
    name: "Test Organization"
  },
  "456qwerty": {
    _id: "456qwerty",
    organizationId: "123asd",
    name: "Test campaign"
  }
}

const initialOrganization = {
  _id: '123asd',
  name: 'Test Organization',
  campaigns: ['456qwerty'],
}

function idMapReducer(state = initialIdMap, action: Action<BaseAction<any>>) {
  const { entity } = action
  switch (action.type) {
    case `app/${entity}/created`:
      const { payload } = action
      return { ...state, [payload._id]: payload }
    default:
      return state
  }
}

function organizationReducer(state = initialOrganization, action: Action<BaseAction<any>>) {
  const { entity } = action
  const prop = pluralize(entity)
  switch (action.type) {
    case `app/${entity}/created`:
      const { payload } = action
        return {
          ...state,
          [prop]: state[prop].concat(payload._id)
        }
    default:
      return state
  }
}

export const store: Store<AppState, BaseAction<any>> = createStore(
  combineReducers({
    idMap: idMapReducer,
    organization: organizationReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

import { combineReducers, createStore, Reducer, Store, Action } from 'redux'

interface IConfig {
  reducers: Record<string, Reducer>
}

export const createTestStore = <State, Actions>({ reducers }: IConfig) => {
  const store: Store<State, Action<Actions>> = createStore(
    combineReducers(reducers),
  )
  return store
}
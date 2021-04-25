// @ts-nocheck
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Entity } from '../types'
import { createEntityAction } from '../state'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Entity would be used for action types: app/resource/${entity}/<action>
// What if this hook would provide common actions, such as create, update and delete?
// These actions would be following a specific convention and structure.
export const useEntity = <T>(entity: Entity, id?: string) => {
  const cachedEntity = useSelector(state => state.idMap[id]) as T
  const dispatch = useDispatch()
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ hasCalledAction, setHasCalledAction ] = useState(false)

  const createEntity = <T>(payload: T): void => {
    dispatch(
      createEntityAction<T>(entity, payload)
    )
  }

  const updateEntity = <T>(payload: T): void => {
    // Dispatch same as createEntity
    setHasCalledAction(true)
  }

  const deleteEntity = (): void => {
    // Dispatch same as createEntity
    setHasCalledAction(true)
  }

  useEffect(() => {
    if (!hasCalledAction && !cachedEntity) {
      // If the entity isn't already fetched and stored in redux, fetch it
      setLoading(true)
      delay(1000)
        .then(/* Dispatch action here, and let socket take care of updating redux state */)
        .catch(/* Dispatch error action here, or not */)
        .finally(() => setLoading(false))
    }
  }, [ cachedEntity ])

  return {
    data: cachedEntity,
    loading,
    error,
    createEntity,
    updateEntity,
    deleteEntity,
  }
}

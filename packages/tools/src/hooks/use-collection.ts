import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState, Entity } from '../types'
import { pluralize } from '../util'

type SelectorResolver = <T>(state: AppState, entities: string[]) => T
type ResolveCollectionType =
  'organization'
  | 'screenOrganizations'
  | 'uniqueMediaTypeOwners'


const resolverMap: Partial<Record<ResolveCollectionType, SelectorResolver>> = {
  organization: (state, entities) => entities.map(id => state.idMap[id]) as any
}

export const useCollection = <T>(
  entity: Entity,
  resolverType: ResolveCollectionType | string[]
) => {
  const cachedEntities = useSelector((state: AppState) => {
    const prop = pluralize(entity) as keyof Pick<AppState['organization'], 'campaigns'>
    const entities = state.organization[prop]

    if (Array.isArray(resolverType)) return
    const resolver = resolverMap[resolverType]
    resolver?.(state, entities)
  })
  const dispatch = useDispatch()
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {

  }, [ cachedEntities ])

  return {
    data: cachedEntities,
    loading,
    error
  }
}
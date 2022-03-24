import { useEffect, useState } from "react";
import { useSelector, useDispatch, Selector } from "react-redux";
import { AppState, Entity } from "../types";
import { createEntityAction, entityFetchedAction } from "../state";

type ResolverWithArgs<TReturnType, TArgs> = {
  select: (args: TArgs) => Selector<AppState, TReturnType>
  fetch: (args: TArgs) => Promise<any>
}

type Resolver<TReturnType> = {
  select?: Selector<AppState, TReturnType>
  fetch?: Promise<TReturnType>
}

interface IPlainApi {
  get?: () => Promise<unknown>
  post?: Promise<unknown>
  put?: Promise<unknown>
  delete?: Promise<unknown>
}

// Entity would be used for action types: app/resource/${entity}/<action>
// These actions would be following a specific convention and structure.
export const useEntity = <T>(
  entity: Entity,
  api: IPlainApi,
  selector?: Selector<AppState, T>,
  formatter?: any
) => {
  const cachedEntity = useSelector(state => selector?.(state as AppState));
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const createEntity = <T>(payload: T): void => {
    dispatch(createEntityAction<T>(entity, payload));
  };

  const updateEntity = <T>(payload: T): void => {
    // Dispatch same as createEntity;
  };

  const deleteEntity = (): void => {
    // Dispatch same as createEntity
  };

  useEffect(() => {
    if (!cachedEntity) {
      setLoading(true)
      // If the entity isn't already fetched and stored in redux, fetch it
      api
        .get?.()
        .then((data: any) => {
          /*
          const item = data.results[0];
          const _id = data.info.seed
          */
          
          // dispatch(entityFetchedAction<T>(entity, { ...item, _id }));
          dispatch(entityFetchedAction<T>(entity, formatter?.(data) ?? data));
          setLoading(false)
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [ cachedEntity ]);

  return {
    data: cachedEntity,
    loading,
    error,
    createEntity,
    updateEntity,
    deleteEntity,
  };
};

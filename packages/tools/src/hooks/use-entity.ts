// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Entity, IApi, IGQLApi, Query } from "../types";
import { createEntityAction, entityFetchedAction } from "../state";
import { isRestApi } from "../util/type-guards";

type Api = IApi | IGQLApi;

// Entity would be used for action types: app/resource/${entity}/<action>
// What if this hook would provide common actions, such as create, update and delete?
// These actions would be following a specific convention and structure.
export const useEntity = <T>(
  entity: Entity,
  api: Api,
  id?: string,
  query?: Query
) => {
  console.log(id);
  const cachedEntity = useSelector(
    (state) => {
      console.log(state);
      return state.idMap[id];
    },
    () => true
  ) as T;
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [hasCalledAction, setHasCalledAction] = useState(false);

  const createEntity = async <T>(payload: T): void => {
    dispatch(createEntityAction<T>(entity, payload));
  };

  const updateEntity = <T>(payload: T): void => {
    // Dispatch same as createEntity
    setHasCalledAction(true);
  };

  const deleteEntity = (): void => {
    // Dispatch same as createEntity
    setHasCalledAction(true);
  };

  useEffect(() => {
    if (!cachedEntity) {
      // If the entity isn't already fetched and stored in redux, fetch it
      setLoading(true);
      if (isRestApi(api)) {
        api
          .get<T>(`/${entity}/${id}`, query)
          .then((data) => {
            if (error) {
              setError(error);
              return;
            }
            const item = data.results[0];
            dispatch(entityFetchedAction<T>(entity, { ...item, _id: id }));
          })
          .catch(setError)
          .finally(() => setLoading(false));
      }
    }
  }, []);

  return {
    data: cachedEntity,
    loading,
    error,
    createEntity,
    updateEntity,
    deleteEntity,
  };
};

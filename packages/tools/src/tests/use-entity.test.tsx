import React, { ReactNode, FunctionComponent } from 'react'
import { Provider } from "react-redux";
import { Store } from 'redux';
import { idMapReducer, organizationReducer } from '@mediatool-poc/core/src/store'
import { renderHook, act } from '@testing-library/react-hooks'
import { createTestStore } from "../testing";
import { AppState } from "../types";
import { useEntity } from "../hooks";

describe('useEntity', () => {
  let store: Store<AppState, any>;
  let wrapper: FunctionComponent<any>;

  beforeEach(() => {
    store = createTestStore<AppState, any>({
      reducers: {
        idMap: idMapReducer,
        organization: organizationReducer
      }
    })
    wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        {children}
      </Provider>
    )
  })

  it('should resolve a cached entity', () => {
    const campaignId = '456qwerty'
    const selector = (state: AppState) => state.idMap[campaignId]

    const api = {
      get: () => Promise.resolve({})
    }
    jest.spyOn(api, 'get')

    const { result } = renderHook(() => useEntity(
      'campaign',
      selector,
      api
    ), { wrapper })

    const { data } = result.current
    expect(data._id).toEqual(campaignId)
    expect(api.get).not.toHaveBeenCalled()
  })

  it('should fetch a non-cached entity and update store accordingly', async () => {
    const mockEntity = { _id: '123test', name: 'Created from test' }
    const selector = (state: AppState) => state.idMap[mockEntity._id]

    const api = {
      get: () => Promise.resolve(mockEntity)
    }
    jest.spyOn(api, 'get')

    const { result, waitForNextUpdate } = renderHook(() => useEntity(
      'campaign',
      selector,
      api
    ), { wrapper })

    await waitForNextUpdate()
    const { data } = result.current
    expect(api.get).toHaveBeenCalledTimes(1)
    expect(data).toEqual(mockEntity)
    expect(store.getState().idMap[mockEntity._id]).toEqual(mockEntity)
  })
})
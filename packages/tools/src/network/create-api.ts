import { IApi, Query } from '../types'

interface IOverrides {
  getEndpoint?: string
  postEndpoint?: string
  putEndpoint?: string
  delEndpoint?: string
}

interface IOptions {
  baseUrl: string
  overrides?: IOverrides
}

const stringifyQuery = (query: Query) =>
  Object.entries(query).map(([ key, value ]) => `${key}=${value}`).join('&')

export const createApi = ({ baseUrl, overrides }: IOptions): IApi => {
  async function get<T>(
    endpoint: string,
    query?: Query,
  ): Promise<T> {
    const q = query
      ? `?${stringifyQuery(query)}`
      : ''
    const res = await fetch(`${baseUrl}${overrides?.getEndpoint ?? endpoint}${q}`)
    const json = await res.json()

    return json as T
  }

  async function post<Payload, T>(
    endpoint: string,
    payload: Payload,
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      body: JSON.stringify(payload),
      method: 'POST'
    })
    const json = await res.json()
    return json as T
  }

  async function put<Payload, T>(
    endpoint: string,
    payload: Payload,
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      body: JSON.stringify(payload),
      method: 'PUT'
    })
    const json = await res.json()
    return json as T
  }

  async function del<Payload, T>(
    endpoint: string,
    payload: Payload,
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      body: JSON.stringify(payload),
      method: 'DELETE'
    })
    const json = await res.json()
    return json as T
  }

  return {
    get,
    post,
    put,
    del
  }
}
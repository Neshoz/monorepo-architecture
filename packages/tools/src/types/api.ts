type GetRequest = <T>(endpoint: string, query?: Query) =>
  Promise<T>

type ActionRequest = <Payload, ResponseType>(endpoint: string, payload: Payload) =>
  Promise<ResponseType>

export interface IApi {
  get: <T>(endpoint: string, query?: Query) => Promise<T>
  post: ActionRequest
  put: ActionRequest
  del: ActionRequest
}

export interface IGQLApi {
  query?: any
  mutation?: any
}

export type Query = Record<string, string | number>
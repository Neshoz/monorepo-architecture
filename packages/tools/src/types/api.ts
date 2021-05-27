type GetRequest = (endpoint: string, query?: Query) => Promise<unknown>;

type ActionRequest = <Payload>(
  endpoint: string,
  payload: Payload
) => Promise<unknown>;

export interface IApi {
  get: GetRequest;
  post: ActionRequest;
  put: ActionRequest;
  del: ActionRequest;
}

export interface IGQLApi {
  query?: any;
  mutation?: any;
}

export type Query = Record<string, string | number>;

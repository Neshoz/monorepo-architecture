import { Query } from "./api";

export interface IHTTPApi {
  get?: (endpoint: string, query: Query) => Promise<unknown>
  post?: <T>(endpoint: string, payload: T) => Promise<unknown>
  put?: <T>(endpoint: string, payload: T) => Promise<unknown>
  delete?: (endpoint: string) => Promise<unknown>
}
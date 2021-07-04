import { Query } from "../types"
import { IHTTPApi } from "../types/http-api"

interface IOverrides {

}

export class HTTPApi implements IHTTPApi {
  private baseUrl: string
  private overrides?: IOverrides

  constructor(baseUrl: string, overrides?: IOverrides) {
    this.baseUrl = baseUrl
    this.overrides = overrides
  }

  public async get(endpoint: string, query?: Query) {
    const q = this.stringifyQuery(query)
    const url = this.buildUrl(endpoint)
    return fetch(`${url}${q ? `?${q}` : ''}`)
      .then(res => res.json())
  }

  public async post<T>(endpoint: string, payload: T) {
    return fetch(this.buildUrl(endpoint), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  public async put<T>(endpoint: string, payload: T) {
    return fetch(this.buildUrl(endpoint), {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  public async delete(endpoint: string) {
    return fetch(this.buildUrl(endpoint), { method: 'DELETE' })
      .then(res => res.json())
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  private stringifyQuery(query?: Query) {
    return query
      ? Object.entries(query)
        .map(([ key, value ]) => `${key}=${value}`)
        .join('&')
      : ''
  }
}
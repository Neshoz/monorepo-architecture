import { IApi, IGQLApi } from '../types'

export function isRestApi(api: IGQLApi | IApi): api is IApi {
  return (api as IApi).post !== undefined
}

export function isGqlApi(api: IGQLApi | IApi): api is IGQLApi {
  return (api as IGQLApi).mutation !== undefined
}
import { createApi } from '@mediatool-poc/tools'

export const api = createApi({
  baseUrl: 'https://randomuser.me/api/',
  overrides: {
    getEndpoint: ''
  }
})

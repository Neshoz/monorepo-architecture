import React from 'react'
import { useParams } from 'react-router-dom'
import { IApi, useEntity } from '@mediatool-poc/tools'
import { api } from './service'

type IRandomUser = {
  _id: string
  login: any
}

const mockedApi: Partial<IApi> = {
  get: () => Promise.resolve({
    _id: '',
    login: {}
  }) as Promise<IRandomUser>
}

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data, loading, error } = useEntity('user', api, userId, { seed: userId })

  if (loading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  console.log(data)

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  )
}

export default UserProfilePage
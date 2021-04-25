import React from 'react'
import { useParams } from 'react-router-dom'
import { useEntity } from '@mediatool-poc/tools'
import { IParams } from './types'

const Campaign = () => {
  const { campaignId } = useParams<IParams>()
  
  const { data } = useEntity('campaign', campaignId)

  console.log(data)

  return (
    <>
      <p>This is actually working</p>
      <p>{JSON.stringify(data, null, 2)}</p>
    </>
  )
}

export default Campaign
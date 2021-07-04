import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@mediatool-poc/ui'
import { HTTPApi } from '@mediatool-poc/tools'

const authApi = new HTTPApi('http://localhost:5001')

interface IUser {
  email: string
  _id: string
}
interface ILoginResponse {
  token: string
}

const LoginPage = () => {
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    authApi.post('/login', { email, password })
      .then(({ token }: ILoginResponse) => {
        authApi.get(`/session/${token}`)
          .then((user: IUser) => {
            history.replace(`/user/${user._id}`)
          })
          .catch(console.error)
      })
      .catch(console.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign in</h3>
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        data-test="email-input"
      />
      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        data-test="password-input"
      />
      <Button
        type="submit"
        data-test="submit-button"
        colorScheme="blue"
      >
        Sign in
      </Button>
    </form>
  )
}

export default LoginPage

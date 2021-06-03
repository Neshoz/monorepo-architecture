import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@mediatool-poc/ui'

const LoginPage = () => {
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = Math.random().toString(32).substring(2)
    history.replace(`/user/${id}`)
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

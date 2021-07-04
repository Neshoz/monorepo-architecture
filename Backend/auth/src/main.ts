import express, { json, NextFunction, Request, Response, urlencoded } from 'express'
import { nanoid } from 'nanoid'
import cookieParser from 'cookie-parser'
import * as https from 'https'

const users: Record<string, any> = {
  'kevin@mediatool.com': {
    email: 'kevin@mediatool.com',
    _id: nanoid()
  },
  'jorgen.rosseland@example.com': {
    email: 'jorgen.rosseland@example.com',
    _id: nanoid()
  }
}
const sessions: Record<string, any> = {}

const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
    return
  }
  console.log(`${new Date().toISOString()}: ${req.method} - ${req.path}`)
  next()
}

const app = express()
// cors
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(loggerMiddleware)
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cookieParser())

app.post('/login', (req, res) => {
  const { email } = req.body
  const user = users[email]

  if (!user) {
    res.status(401).send({ message: 'Invalid credentials' })
    return
  }
  
  const sessionId = nanoid()
  sessions[sessionId] = user

  res.status(200).send({ token: sessionId })
}) 

app.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params

  if (!sessionId) {
    res.status(403).send({ message: 'Session expired' })
    return
  }

  res.cookie('sid', sessionId)
  res.send(sessions[sessionId])
})

app.get('/user/:userId', (req, expressRes) => {
  const { userId } = req.params
  const httpReq = https.get(`https://randomuser.me/api/?seed=${userId}`, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      const { results, info } = JSON.parse(data)
      const [ user ] = results

      expressRes.send({ ...user, _id: info.seed })
    })

    httpReq.on('error', (error) => console.log('error ', error.message))
    httpReq.end()
  })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Auth server is running on 0.0.0.0:${PORT}`)
})
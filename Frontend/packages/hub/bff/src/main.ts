import express, { json, urlencoded, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import * as https from 'https'

const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()}: ${req.method} - ${req.path}`)
  next()
}

const app = express()
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(loggerMiddleware)
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cookieParser())

const request = (url: string) => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })

      req.on('error', (error) => reject(error))
      req.end()
    })
  })
}

app.get('/organization/:orgId', (req, res) => {
  const { orgId } = req.params
  request(`https://swapi.dev/api/planets/${orgId}/`)
    .then(value => res.send(value))
    .catch(console.log)
})

const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
  console.log(`Hub BFF is running on 0.0.0.0:${PORT}`)
})
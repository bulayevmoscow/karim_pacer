import express from 'express'
import { TExternalData } from '@monorepo/types'
import { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT ?? 3005

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appData: TExternalData = {
  pathInfo: [
    { connected: false, status: 'IDLE' },
    { connected: false, status: 'IDLE' },
    { connected: false, status: 'IDLE' },
  ],
}

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  console.log('URL: ', req.originalUrl)
  console.log('BODY: ', req.body)
  console.log('')
  next()
})

app.post(
  '/api/trackconnect',
  (
    req: Request<{}, {}, { action: 'CONNECT' | 'DISCONNECT'; id: '0' | '1' | '2' }>,
    res: Response<TExternalData | {}>,
    next: NextFunction
  ) => {
    console.log(appData)
    try {
      if (req.body.action === 'CONNECT') {
        appData.pathInfo[Number(req.body.id)].connected = true
      } else if (req.body.action === 'DISCONNECT') {
        appData.pathInfo[Number(req.body.id)].connected = false
      } else {
        throw 'Error!'
      }
      res.status(200)
    } catch (e) {
      res.status(500)
      console.error(e)
    }
    next()
  }
)

app.post('/api/data', (req, res, next) => {
  res.status(200)
  next()
})

app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
  // res.send(res.statusCode === 500 ? {} : appData);
  res.send(appData)
  next()
})

app.listen(port, () => console.log(`Running on port ${port}\n`))

export default app

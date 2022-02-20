import express from 'express'
import { TRequests, TTrack } from '@monorepo/types'
import { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { TLanesInfo } from '@monorepo/front/src/store/storeTypes'
import { appData, trackData } from './data'

const TIMEOUT = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const app = express()
const port = process.env.PORT ?? 3005

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  await TIMEOUT(2000)
  console.log('URL: ', req.originalUrl)
  if (req.body && Object.keys(req.body).length !== 0) {
    console.log('BODY: ', req.body)
  }
  console.log('')
  next()
})

app.post(
  '/api/trackConnect',
  (
    req: Request<{}, {}, Extract<TRequests, { url: 'api/trackconnect' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/trackconnect' }>['res']>,
    next: NextFunction
  ) => {
    res.status(400).send()
    next()
  }
)

app.post(
  '/api/shortData',
  (
    _req: Request<{}, {}, Extract<TRequests, { url: 'api/shortData' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/shortData' }>['res']>,
    next: NextFunction
  ) => {
    const resBody: Extract<TRequests, { url: 'api/shortData' }>['res'] = appData.tracks
    res.status(200).json(resBody)
  }
)
app.post(
  '/api/trackData',
  (
    req: Request<{}, {}, Extract<TRequests, { url: 'api/trackData' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/trackData' }>['res']>,
    next: NextFunction
  ) => {
    if (req.body.id === undefined) {
      console.log(req.headers, req.body.id)
      throw new Error('No number')
    }
    res.status(200)
    res.json(trackData.track)
  }
)

app.listen(port, () => console.log(`Running on port ${port}\n`))

app.get('/', (req, res) => {
  res.send('<html></html>')
})

setInterval(() => {
  const progress = appData.tracks[0].progress
  appData.tracks[0].progress = progress >= 90 ? 0 : progress + 10
}, 3000)

export default app

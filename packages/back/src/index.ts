import express from 'express'
import { TRequests, TTrack } from '@monorepo/types'
import { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { TLanesInfo } from '@monorepo/front/src/store/storeTypes'
import DataStorage from './DataStorage'

const TIMEOUT = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const app = express()
const port = process.env.PORT ?? 3005

app.use(bodyParser())

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  await TIMEOUT(0)
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
  '/api/addInterval',
  (
    req: Request<{}, {}, Extract<TRequests, { url: 'api/addInterval' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/addInterval' }>['res']>,
    next: NextFunction
  ) => {
    if (req.body) {
      DataStorage.addInterval(req.body)
      res.status(200).send()
    } else {
      res.status(400).send()
    }
    next()
  }
)

app.post(
  '/api/delInterval',
  (
    req: Request<{}, {}, Extract<TRequests, { url: '/api/delInterval' }>['payload']>,
    res: Response<Extract<TRequests, { url: '/api/delInterval' }>['res']>,
    next: NextFunction
  ) => {
    if (req.body) {
      DataStorage.deleteInterval(req.body)
      res.status(200).send()
    } else {
      res.status(400).send()
    }
    next()
  }
)

app.post(
  '/api/startTrack',
  (
    req: Request<{}, {}, Extract<TRequests, { url: '/api/startTrack' }>['payload']>,
    res: Response<Extract<TRequests, { url: '/api/startTrack' }>['res']>,
    next: NextFunction
  ) => {
    if (req.body) {
      DataStorage.switchTrackStatus(req.body.id, req.body.status ? 'PROGRESS' : 'IDLE')
      res.status(200).send()
    } else {
      res.status(400).send()
    }
    next()
  }
)

app.post(
  '/api/shortData',
  (
    _req: Request<{}, {}, Extract<TRequests, { url: 'api/shortData' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/shortData' }>['res']>
  ) => {
    res.status(200).json(DataStorage.getShortData())
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
      throw new Error('No number')
    }
    res.status(200)
    res.json(DataStorage.getTrackData(req.body.id))
  }
)

app.listen(port, () => console.log(`Running on port ${port}\n`))

// setInterval(() => {
//   const progress = appData.tracks[0].progress
//   appData.tracks[0].progress = progress >= 90 ? 0 : progress + 10
// }, 3000)

export default app

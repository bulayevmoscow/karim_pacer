import express from 'express'
import { TRequests, TTrack } from '@monorepo/types'
import { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { TLanesInfo } from '@monorepo/front/src/store/storeTypes'

const TIMEOUT = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const app = express()
const port = process.env.PORT ?? 3005

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appData: { tracks: TTrack[] } = {
  tracks: [
    {
      id: 0,
      name: 'Дорожка 0',
      status: true,
      progress: 70,
      connected: true,
      intervals:
        [
          {
            id: 0,
            speed: 90,
            distance: 500,
            rest: 20,
            repeat: 2,
            temp: 400,
            progress: 20,
          },
        ] || [],
    },
    {
      id: 1,
      name: 'Дорожка 1',
      status: true,
      progress: 0,
      connected: true,
      intervals: [],
    },
    {
      id: 2,
      name: 'Дорожка 2',
      status: true,
      progress: 0,
      connected: true,
      intervals: [],
    },
  ],
}

const trackData: { track: TTrack } = {
  track: {
    id: 0,
    name: 'Дорожка 0',
    status: true,
    progress: 70,
    connected: true,
    intervals: [
      {
        id: 0,
        speed: 90,
        distance: 500,
        rest: 20,
        repeat: 2,
        temp: 400,
        progress: 20,
      },
      {
        id: 1,
        speed: 90,
        distance: 500,
        rest: 20,
        repeat: 2,
        temp: 400,
        progress: 20,
      },
      {
        id: 2,
        speed: 90,
        distance: 500,
        rest: 20,
        repeat: 2,
        temp: 400,
        progress: 20,
      },
    ],
  },
}

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  console.log('URL: ', req.originalUrl)
  // console.log('BODY: ', req.body)
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
    const resBody: Extract<TRequests, { url: 'api/shortData' }>['res'] = appData.tracks.map((value, index) => {
      return { ...value, id: index }
    })

    const testapi: TTrack[] = [
      {
        progress: 1,
        id: 0,
        status: true,
        connected: true,
        name: 'track 1',
        intervals: [
          {
            id: 0,
            progress: 1,
            speed: 10,
            distance: 200,
            rest: 20,
            repeat: 4,
            temp: 400,
          },
        ],
      },
    ]

    res.status(200).json(resBody && testapi)
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

export default app

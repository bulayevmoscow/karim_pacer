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
      state: 'IDLE',
      progress: 0,
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
            progress: 30,
          },
        ] || [],
    },
    {
      id: 1,
      name: 'Дорожка 1',
      state: 'IDLE',
      progress: 0,
      connected: true,
      intervals: [],
    },
    {
      id: 2,
      name: 'Дорожка 2',
      state: 'IDLE',
      progress: 0,
      connected: true,
      intervals: [],
    },
  ],
}

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  console.log('URL: ', req.originalUrl)
  // console.log('BODY: ', req.body)
  console.log('')
  next()
})

app.post(
  '/api/trackconnect',
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
  '/api/shortdata',
  (
    req: Request<{}, {}, Extract<TRequests, { url: 'api/shortdata' }>['payload']>,
    res: Response<Extract<TRequests, { url: 'api/shortdata' }>['res']>,
    next: NextFunction
  ) => {
    const resBody: Extract<TRequests, { url: 'api/shortdata' }>['res'] = appData.tracks.map((value, index) => {
      return { ...value, id: index }
    })
    res.status(200).json(resBody)
  }
)

app.listen(port, () => console.log(`Running on port ${port}\n`))

app.get('/', (req, res) => {
  res.send('<html></html>')
})

export default app

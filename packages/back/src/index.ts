import express from 'express'
import { TExternalData, TRequests } from '@monorepo/types'
import { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'

const TIMEOUT = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const app = express()
const port = process.env.PORT ?? 3005

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appData: TExternalData = {
  pathInfo: [
    { connected: false, status: 'IDLE', tasks: [] },
    { connected: false, status: 'IDLE', tasks: [] },
    { connected: true, status: 'IDLE', tasks: [] },
  ],
}

const runTasks = async (id: number) => {
  appData.pathInfo[id].tasks = appData.pathInfo[id]?.tasks?.map(task => ({ ...task, progress: 0 }))
  const tasks = appData.pathInfo[id].tasks
  if ((tasks && tasks.length === 0) || !tasks) {
    throw new Error('No tasks')
  }
  let taskNumber = 0
  appData.pathInfo[taskNumber].status = 'PROGRESS'

  for (const task of tasks) {
    if (task.progress || task.progress === 0) {
      for (let i = 0; task.progress < task.speed; task.progress++) {
        await TIMEOUT(1000)
        console.log(`${task.name} = ${task.speed} / ${task.progress}`)
      }
    } else {
      throw new Error('No taks')
    }
  }
  appData.pathInfo[taskNumber].status = 'IDLE'
  console.log('THISISALL', JSON.stringify(tasks, null, '\t'))
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
    res: Response<TExternalData | {}>,
    next: NextFunction
  ) => {
    try {
      if (req.body.action === 'CONNECT') {
        appData.pathInfo[Number(req.body.id)].connected = true
      } else if (req.body.action === 'DISCONNECT') {
        appData.pathInfo[Number(req.body.id)].connected = false
      } else {
        throw 'Error! ' + JSON.stringify(req.body)
      }
      res.status(200)
    } catch (e) {
      res.status(500)
      console.error(e)
    }
    next()
  }
)

app.post(
  '/api/starttrack',
  (
    req: Request<{}, {}, Extract<TRequests, { url: 'api/starttrack' }>['payload']>,
    res: Response<TExternalData | {}>,
    next: NextFunction
  ) => {
    try {
      appData.pathInfo[req.body.id].tasks = req.body.action
      runTasks(req.body.id)
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
  // res.status(500).send()
  // return
  res.send(res.statusCode === 500 ? {} : appData)
  // res.send(appData)
  next()
})

app.listen(port, () => console.log(`Running on port ${port}\n`))

app.get('/', (req, res) => {
  res.send('<html></html>')
})

export default app

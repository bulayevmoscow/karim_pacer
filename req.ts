// Вид одного интервала
export type TInterval = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  speed: number
  distance: number
  rest: number
  temp: number
  repeat: number
  progress?: number
}

// Вид Задачи дорожки
export type TTrack = {
  id: number
  name?: string
  connected: boolean
  state: 'IDLE' | 'PPROGRESS'
  progress: number
  intervals: TInterval[] | TInterval | []
}

// варианты запросов на сервер
export type TRequests =
  | {
      url: 'api/shortData'
      payload: {}
      res: TTrack[] // пример simpleData
    }
  | {
      url: 'api/trackConnect'
      payload: {
        id: number
        status: boolean
      }
      res: TTrack[] // пример task5Intervals Полная информация о дорожке
    }
  | {
      url: 'api/trackData'
      payload: {
        id: number
      }
      res: TTrack // пример task5Intervals Полная информация о дорожке
    }
  | {
      url: 'api/getTemplates'
      payload: {}
      res: TTrack[]
    }
  | {
      url: 'api/setTask'
      payload: {
        id: number //Номер дорожки
        task: TTrack //задача интервалов
      }
    }
  | {
      url: 'api/saveTemplate'
      payload: {
        id: number //Номер дорожки
        name: string //имя шаблона
        task: TTrack //задача шаблона
      }
    }
  | {
      url: 'api/starttrack'
      payload: {
        id: number
        state: boolean //true - запустить / false - остановить можно заменить на IDLE PROGRESS
      }
    }

const interval: TInterval = {
  id: 1, // выполняемый интервал
  speed: 90, // скорость 100 метров за 90 секунд
  distance: 200, // количество метров сколько проплыть (кратно длинне бассейна)
  rest: 20, // время отдыха между повторами
  temp: 400, // "метроном" в милисекундах
  repeat: 10, // количество повторов
  progress: 0, // 0% - 100%
}

const intervalInProgress: TInterval = {
  id: 1, // выполняемый интервал
  speed: 90, // скорость 100 метров за 90 секунд
  distance: 500, // количество метров сколько проплыть (кратно длинне бассейна)
  rest: 20, // время отдыха между повторами
  temp: 400, // "метроном" в милисекундах
  repeat: 2, // количество повторов
  progress: 70, // 0% - 100%
}

const taskFree: TTrack = {
  id: 0,
  connected: true,
  state: 'IDLE',
  progress: 0,
  intervals: [],
}

const task5Intervals: TTrack = {
  id: 0,
  connected: true,
  state: 'IDLE',
  progress: 0,
  intervals: [interval, { ...interval, id: 2 }, { ...interval, id: 3 }, { ...interval, id: 4 }, { ...interval, id: 5 }],
}

const taskShort: TTrack = {
  id: 1,
  connected: true,
  state: 'IDLE',
  progress: 0,
  intervals: interval,
}

const templates: TTrack[] = [
  { ...task5Intervals, name: 'Pupkin' },
  { ...task5Intervals, name: 'Fedoroff' },
  { ...task5Intervals, name: 'FastTemplate' },
  { ...task5Intervals, name: 'SlowSwim' },
]

const simpleData: TTrack[] = [
  { ...taskShort, id: 0, state: 'PPROGRESS', intervals: intervalInProgress },
  { ...taskShort, id: 1, state: 'IDLE' },
  { ...taskShort, id: 2, connected: false },
]

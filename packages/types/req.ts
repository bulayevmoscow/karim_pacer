// Вид одного интервала
export type TInterval = {
  id: number
  speed: number
  distance: number
  rest: number
  temp: number
  repeat: number
  progress: number
}

// Вид Задачи дорожки
export type TTrack = {
  id: number
  name: string
  connected: boolean
  status: 'IDLE' | 'PROGRESS' | 'DISCONNECT'
  progress: number
  intervals: TInterval[]
}

export type TLane = TTrack

// варианты запросов на сервер
export type TRequests =
  | {
      url: 'api/shortData'
      payload: undefined
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
      url: '/api/startTrack'
      payload: {
        id: number
        status: boolean
      }
      res: undefined // пример task5Intervals Полная информация о дорожке
    }
  | {
      url: 'api/trackData'
      payload: {
        id: number
      }
      res?: TTrack // пример task5Intervals Полная информация о дорожке
    }
  | {
      url: '/api/addInterval'
      payload: { track_id: number; interval: TInterval & { id: 0 } }
    }
  | { url: '/api/delInterval'; payload: { track_id: number; id: number }; res: undefined }
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
      url: 'api/startTrack'
      payload: {
        id: number
        state: boolean //true - запустить / false - остановить можно заменить на IDLE PROGRESS
      }
    }
  | never

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

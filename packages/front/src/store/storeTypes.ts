export type TNavigation =
  | {
      title: 'Дорожки'
      pageTag: 'main'
    }
  | {
      title: 'Дорожка'
      pageTag: 'lane'
      idLine: number
    }
  | {
      title: 'Настройки'
      pageTag: 'setting'
    }

export type TModalManager =
  | {}
  | {
      header: 'Ошибка подключения'
      type: 'ErrorConnect'
      code: number
      url: string
    }

export type TInterval = {
  id: number
  speed: number
  distance: number
  rest: number
  temp: number
  repeat: number
  progress: number
}

export type TLanesInfo =
  | {
      id: number
      name: string
      status: boolean
      interval?: TInterval
    }[]
  | []

export type TLaneInfo = {
  id: number
  isLoading: boolean
  isRunning: boolean
  intervals?: (TInterval & { name: string })[] | []
}

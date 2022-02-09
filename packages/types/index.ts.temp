export type TTask = {
  name: string
  speed: number
  distance: number
  rest: number
  temp: number
  repeat: number
  progress?: number
}

export type TRequests =
  | {
      url: 'api/trackconnect'
      payload: {
        id: number
        action: 'DISCONNECT' | 'CONNECT'
      }
    }
  | {
      url: 'api/starttrack'
      payload: {
        id: number
        action: TTask[]
      }
    }

export type TPathInfo = {
  connected: boolean
  status: 'IDLE' | 'PROGRESS'
  tasks?: TTask[] | []
}

export type TExternalData = {
  pathInfo: [TPathInfo, TPathInfo, TPathInfo]
}

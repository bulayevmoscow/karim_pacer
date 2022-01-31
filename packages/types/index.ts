export type TPathInfo = {
  connected: boolean
  status: 'IDLE' | 'PROGRESS'
}

export type TExternalData = {
  pathInfo: [TPathInfo, TPathInfo, TPathInfo]
}

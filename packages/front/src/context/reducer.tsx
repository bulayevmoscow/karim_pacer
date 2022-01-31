import React, { createContext, FC, useCallback, useContext, useReducer, useState } from 'react'
import { TExternalData } from '@monorepo/types'
import axios, { AxiosResponse } from 'axios'

type TAction = { type: 'changePage'; page: 0 | 1 | 2 | 3 } | { type: 'updateDataFromServer'; data: TExternalData }

export type TInternalData = {
  appInfo: { tab: number }
}

type TContext = TInternalData & TExternalData

export const initionalData: TContext = {
  appInfo: { tab: 0 },
  pathInfo: [
    { connected: true, status: 'IDLE' },
    { connected: true, status: 'IDLE' },
    { connected: false, status: 'IDLE' },
  ],
}

const reducer = (prev: TContext, action: TAction): TContext => {
  console.log('reducer: ', action)
  switch (action.type) {
    case 'changePage':
      return { ...prev, appInfo: { ...prev.appInfo, tab: action.page } }
    case 'updateDataFromServer':
      return { ...prev, ...action.data }
    default: {
      console.log('no change')
      return prev
    }
  }
}

export const MyContext = createContext<{
  state: TContext
  dispatch: React.Dispatch<TAction>
}>({
  state: initionalData,
  dispatch: () => {},
})

const axiosInstance = axios.create({
  method: 'POST',
  url: '/api/',
})

export const Request = ({
  url,
  payload,
  dispatch,
}: {
  url: string
  payload: {}
  dispatch: React.Dispatch<TAction>
}) => {
  return async () => {
    await axiosInstance(url, { data: payload }).then((x: AxiosResponse<TExternalData>) =>
      dispatch({ type: 'updateDataFromServer', data: x.data })
    )
  }
}

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initionalData)

  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
}

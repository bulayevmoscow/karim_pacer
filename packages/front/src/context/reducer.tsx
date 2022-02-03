import React, { createContext, FC, useReducer } from 'react'
import { TRequests, TExternalData } from '@monorepo/types'
import axios, { AxiosResponse } from 'axios'

export type TAction =
  | { type: 'changePage'; page: 0 | 1 | 2 | 3 }
  | { type: 'updateDataFromServer'; data: TExternalData }
  | { type: 'connectStatusToggle'; status: boolean; url?: string; code?: string }

export type TInternalData = {
  appInfo: { tab: number; statusConnect: 'CONNECTED' | 'DISCONNECTED'; errorConnect: { code?: string; url?: string } }
}

export type TContext = TInternalData & TExternalData

export const initionalData: TContext = {
  appInfo: {
    tab: 0,
    statusConnect: 'CONNECTED',
    errorConnect: {
      code: undefined,
      url: undefined,
    },
  },
  pathInfo: [
    {
      connected: true,
      status: 'IDLE',
    },
    {
      connected: true,
      status: 'IDLE',
    },
    {
      connected: false,
      status: 'IDLE',
    },
  ],
}

const reducer = (prev: TContext, action: TAction): TContext => {
  console.log('reducer: ', action)
  switch (action.type) {
    case 'changePage':
      return {
        ...prev,
        appInfo: {
          ...prev.appInfo,
          tab: action.page,
        },
      }
    case 'updateDataFromServer':
      if (!action.data) {
        return prev
      }

      return {
        ...prev,
        ...action.data,
      }

    case 'connectStatusToggle':
      return {
        ...prev,
        appInfo: {
          ...prev.appInfo,
          statusConnect: action.status ? 'CONNECTED' : 'DISCONNECTED',
          errorConnect: {
            code: action.code,
            url: action.url,
          },
        },
      }
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

export const createRequest = <T extends {}>({
  url,
  payload,
  dispatch,
}: { dispatch: React.Dispatch<TAction> } & TRequests) => {
  return async () => {
    return axios.post<any, AxiosResponse<TExternalData>>(url, payload).then(x => {
      dispatch({
        type: 'updateDataFromServer',
        data: x.data,
      })
      return x
    })
  }
}

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initionalData)
  return (
    <MyContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

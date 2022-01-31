import axios, { AxiosError } from 'axios'
import { TAction, TContext } from '@context'
import React from 'react'

export const axiosConnectStatusInterseptor = ({
  state,
  dispatch,
}: {
  state: TContext
  dispatch: React.Dispatch<TAction>
}) => {
  axios.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
      console.log('interceptors[rej]', error?.response?.status, state.appInfo.statusConnect)
      dispatch({
        type: 'connectStatusToggle',
        status: false,
        url: error.config.url,
        code: String(error?.response?.status),
      })
      return Promise.reject(error)
    }
  )
}

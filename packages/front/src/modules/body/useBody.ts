import { createRequest, TAction, TContext } from '@context'
import React, { useState } from 'react'

export const useBody = ({ state, dispatch }: { state: TContext; dispatch: React.Dispatch<TAction> }) => {
  const pageNumber = state.appInfo.tab
  const [refetchStatus, setRefetchStatus] = useState(false)
  const dispatchSuccessReconnect = <T>(res: T): T | undefined => {
    dispatch({
      type: 'connectStatusToggle',
      status: true,
    })
    return res
  }

  const fetchData = createRequest({
    url: 'api/data',
    payload: {},
    dispatch,
  })

  const fetchErrorHandler = async () => {
    setRefetchStatus(true)
    fetchData()
      .then(dispatchSuccessReconnect)
      .catch(e => Promise.reject(e))
    setTimeout(() => {
      setRefetchStatus(false)
    }, 5000)
  }

  return {
    refetchStatus,
    fetchErrorHandler,
    fetchData,
    pageNumber,
  }
}

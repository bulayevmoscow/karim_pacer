import { useContext, useEffect, useMemo, useState } from 'react'
import { MyContext } from '@context'
import { TabHeader } from '@modules/body/TabHeader'
import { axiosConnectStatusInterseptor } from '@utils/index'
import { BodyPath } from '@modules/body/BodyPathSwitcher/BodyPath'
import { ModalErrorConnect } from '@modules/body/ModalError/ModalErrorIndex'
import { useBody } from '@modules/body/useBody'

export const Body = () => {
  const { state, dispatch } = useContext(MyContext)
  const trackNumber = state.appInfo.tab
  const [run, setRun] = useState(false)
  const { fetchErrorHandler, pageNumber, refetchStatus, fetchData } = useBody({
    state,
    dispatch,
  })

  useMemo(() => {
    axiosConnectStatusInterseptor({
      state,
      dispatch,
    })
  }, [dispatch, state])
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state.pathInfo.find(path => path.status === 'PROGRESS')) {
      setRun(prev => true)
    } else {
      setRun(prev => false)
    }
  }, [state.pathInfo])

  // eslint-disable-next-line no-undef
  let interval: NodeJS.Timer

  useEffect(() => {
    if (run) {
      interval = setInterval(fetchData, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [fetchData, run])

  return (
    <>
      <TabHeader />
      <ModalErrorConnect
        status={refetchStatus}
        refetch={fetchErrorHandler}
        isShow={state.appInfo.statusConnect !== 'CONNECTED'}
        url={state.appInfo.errorConnect.url}
        code={state.appInfo.errorConnect.code}
      />
      {pageNumber === 3 ? <>TODOSETTING PAGE</> : <BodyPath trackNumber={trackNumber} />}
    </>
  )
}

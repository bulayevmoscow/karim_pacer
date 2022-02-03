import { useContext, useEffect, useMemo } from 'react'
import { MyContext } from '@context'
import { TabHeader } from '@modules/body/TabHeader'
import { axiosConnectStatusInterseptor } from '@utils'
import { BodyPath } from '@modules/body/BodyPathSwitcher/BodyPath'
import { ModalErrorConnect } from '@modules/body/ModalError/ModalErrorIndex'
import { useBody } from '@modules/body/useBody'

export const Body = () => {
  const { state, dispatch } = useContext(MyContext)

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
      {pageNumber === 3 ? <>TODOSETTING PAGE</> : <BodyPath />}
    </>
  )
}

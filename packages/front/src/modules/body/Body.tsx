import { useContext, useEffect } from 'react'
import { MyContext, Request } from '@context'
import { TabHeader } from '@modules/body/TabHeader'
import { BodyPathSwitcher } from '@modules/body/BodyPathSwitcher/BodyPathSwitcher'

export const Body = () => {
  const { state, dispatch } = useContext(MyContext)
  const request = Request({
    url: 'api/data',
    payload: {},
    dispatch,
  })
  const pageNumber = state.appInfo.tab
  useEffect(() => {
    request()
  }, [])
  return (
    <div>
      <TabHeader />
      {pageNumber === 3 ? <>TODOSETTING PAGE</> : <BodyPathSwitcher />}
    </div>
  )
}

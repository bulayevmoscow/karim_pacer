import { useContext, useEffect } from 'react'
import { MyContext, Request } from '@context'
import { TabHeader } from '@modules/body/TabHeader'
import { BodyPathSwitcher } from '@modules/body/BodyPathSwitcher/BodyPathSwitcher'

export const Body = () => {
  const { dispatch } = useContext(MyContext)
  const request = Request({
    url: 'api/data',
    payload: {},
    dispatch,
  })
  useEffect(() => {
    request()
  }, [])
  return (
    <div>
      <TabHeader />
      <BodyPathSwitcher />
    </div>
  )
}

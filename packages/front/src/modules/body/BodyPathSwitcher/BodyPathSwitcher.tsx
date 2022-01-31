import style from './BodyPathSwitcher.module.pcss'
import { Toggle } from '@modules/library/Toggle'
import { useContext } from 'react'
import { MyContext, Request } from '@context'

export const BodyPathSwitcher = () => {
  const { state, dispatch } = useContext(MyContext)
  const pathStatus = state.pathInfo[state.appInfo.tab].connected
  const request = Request({
    url: 'api/trackconnect',
    payload: {
      id: state.appInfo.tab,
      action: !pathStatus ? 'CONNECT' : 'DISCONNECT',
    },
    dispatch,
  })
  return (
    <div className={style.body_treadmill_container}>
      BodyTreadmill
      <Toggle value={pathStatus} dispatcher={request} />
    </div>
  )
}

import style from './BodyPathSwitcher.module.pcss'
import { Toggle } from '@modules/library/Toggle'
import { useContext } from 'react'
import { MyContext, createRequest } from '@context'
import { TaskContainer } from '@modules/body/TaskContainer/TaskContainer'

export const BodyPath = () => {
  const { state, dispatch } = useContext(MyContext)
  const pathStatus = state.pathInfo[state.appInfo.tab].connected
  /* eslint-disable no-negated-condition */
  const request = createRequest({
    url: 'api/trackconnect',
    payload: {
      id: state.appInfo.tab,
      action: !pathStatus ? 'CONNECT' : 'DISCONNECT',
    },
    dispatch,
  })
  return (
    <div className={style.bodyPathSwitcher_container}>
      <div className={style.toggle}>
        <Toggle value={pathStatus} dispatcher={request} />
      </div>
      <div className={style.task_list}>
        <TaskContainer />
        <TaskContainer />
        <TaskContainer />
      </div>
    </div>
  )
}

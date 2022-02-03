import style from './BodyPathSwitcher.module.pcss'
import { Toggle } from '@modules/library/Toggle'
import { FC, useContext } from 'react'
import { MyContext, createRequest } from '@context'
import { TaskContainer } from '@modules/body/TaskContainer/TaskContainer'
import { TTask } from '@monorepo/types'

type TBodyPath = {
  trackNumber: number
}

export const BodyPath: FC<TBodyPath> = ({ trackNumber }) => {
  const { state, dispatch } = useContext(MyContext)
  const pathStatus = state.pathInfo[trackNumber].connected
  const requestConnect = createRequest({
    url: 'api/trackconnect',
    payload: {
      id: state.appInfo.tab,
      action: pathStatus ? 'DISCONNECT' : 'CONNECT',
    },
    dispatch,
  })

  const taskList: TTask[] = [
    { name: 'Интвервал 1', speed: 5, distance: 100, rest: 20, temp: 400, repeat: 10 },
    { name: 'Интвервал 2', speed: 2, distance: 100, rest: 20, temp: 400, repeat: 10 },
    { name: 'Интвервал 3', speed: 2, distance: 100, rest: 20, temp: 400, repeat: 10 },
  ]

  const requestRun = createRequest({
    url: 'api/starttrack',
    payload: {
      id: state.appInfo.tab,
      action: taskList,
    },
    dispatch,
  })

  const serverTasks = state.pathInfo[trackNumber].tasks
  return (
    <div className={style.bodypath_container}>
      <div className={style.toggle}>
        <Toggle value={pathStatus} dispatcher={requestConnect} />
      </div>
      <div className={style.bodyPathSwitcher_container}>
        <div className={style.task_list}>
          {taskList?.map((task, index) => {
            const compare = serverTasks?.find(serverTask => serverTask.name === task.name)
            return <TaskContainer key={index} {...task} progress={compare?.progress ?? 0} />
          })}
        </div>
      </div>
      <div className={style.task_button_container}>
        <button className={style.task_button_run} onClick={requestRun}>
          Старт тренировки
        </button>
        <button className={style.task_button_choice_template} disabled={true}>
          Выбрать шаблон
        </button>
      </div>
    </div>
  )
}

import { observer } from 'mobx-react-lite'
import store from '@store'
import style from './Lane.module.scss'
import IconLoading from '@modules/icons/progress.png'
import { TaskUnit } from '@modules/components/lane/task/TaskUnit'
// import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit'

export const Lane = observer(() => {
  const { laneInfo } = store

  if (laneInfo.isLoading) {
    return (
      <div className={style.tracks}>
        <div className={style.tracks_container}>
          <div className={style.loading_icon_container}>
            <img src={IconLoading} alt="" />
          </div>
        </div>
      </div>
    )
  }

  // Если есть активные задачи
  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          {laneInfo.intervals?.map((lane, index) => (
            <TaskUnit
              key={index}
              tempo={lane.tempo}
              repeat={lane.repeat}
              rest={lane.rest}
              distance={lane.distance}
              speed={lane.speed}
              progress={lane.progress}
              name={lane.name}
              isShutdown={false}
              onClick={() => undefined}
              isClick={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

//      {showButtonPanel !== false && (
//         <div className={style.tracks_buttons_container}>
//           {lanesInfo[showButtonPanel].status ? (
//             <Button
//               color="red"
//               onClick={e => {
//                 store.toggleLaneStatus(showButtonPanel, 'OFF')
//                 e.stopPropagation()
//               }}
//             >
//               Отключить
//             </Button>
//           ) : (
//             <Button
//               color="green"
//               onClick={e => {
//                 store.toggleLaneStatus(showButtonPanel, 'ON')
//                 e.stopPropagation()
//               }}
//             >
//               Включить
//             </Button>
//           )}
//           <Button
//             color="gray"
//             onClick={e => {
//               e.stopPropagation()
//             }}
//           >
//             Редактировать
//           </Button>
//         </div>
//       )}

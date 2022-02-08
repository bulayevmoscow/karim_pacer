import { observer } from 'mobx-react-lite'
import store from '@store'
import style from './Lane.module.scss'
import IconLoading from '@modules/icons/progress.png'
// import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit'

export const Lane = observer(() => {
  const { laneInfo, page } = store
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

  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>{JSON.stringify(laneInfo)}</div>
      </div>
    </div>
  )
})

//          {laneInfo?.map(lane => (
//             <TrackUnit
//               key={lane.id}
//               {...lane.interval}
//               name={lane.name}
//               isShutdown={!lane.status}
//               onClick={eventStart(() => (showButtonPanel === lane.id ? undefined : setShowButtonPanel(lane.id)))}
//               isClick={lane.id === showButtonPanel}
//             />
//           ))}

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

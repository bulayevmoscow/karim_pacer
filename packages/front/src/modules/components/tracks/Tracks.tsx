import style from './Tracks.module.scss'
import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit'
import { observer } from 'mobx-react-lite'
import { Button } from '@modules/library/Button'
import { useTracks } from '@modules/components/tracks/useTracks'
import store from '@store'

export const Tracks = observer(() => {
  const { setShowButtonPanel, showButtonPanel, lanesInfo, eventStart } = useTracks()
  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          {lanesInfo?.map(lane => (
            <TrackUnit
              key={lane.id}
              {...lane.interval}
              name={lane.name}
              isShutdown={!lane.status}
              onClick={eventStart(() => (showButtonPanel === lane.id ? undefined : setShowButtonPanel(lane.id)))}
              isClick={lane.id === showButtonPanel}
            />
          ))}
        </div>
      </div>
      {showButtonPanel !== false && (
        <div className={style.tracks_buttons_container}>
          {lanesInfo[showButtonPanel].status ? (
            <Button
              color="red"
              onClick={e => {
                store.toggleLaneStatus(showButtonPanel, 'OFF')
                e.stopPropagation()
              }}
            >
              Отключить
            </Button>
          ) : (
            <Button
              color="green"
              onClick={e => {
                store.toggleLaneStatus(showButtonPanel, 'ON')
                e.stopPropagation()
              }}
            >
              Включить
            </Button>
          )}
          <Button
            color="gray"
            onClick={e => {
              e.stopPropagation()
            }}
          >
            Редактировать
          </Button>
        </div>
      )}
    </div>
  )
})

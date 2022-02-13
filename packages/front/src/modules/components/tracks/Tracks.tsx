import style from './Tracks.module.scss'
import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit'
import { observer } from 'mobx-react-lite'
import { Button } from '@modules/library/Button'
import { useTracks } from '@modules/components/tracks/useTracks'
import store from '@store'

export const Tracks = observer(() => {
  const { setShowButtonPanel, showButtonPanel, lanesInfo, eventStart, goToLane } = useTracks()
  console.log(JSON.parse(JSON.stringify(lanesInfo)))
  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          {lanesInfo?.length > 0 &&
            lanesInfo.map(lane => (
              <TrackUnit
                key={lane.id}
                name={lane.name ?? 'Дорожка'}
                isDiconnected={!lane.connected}
                {...lane.intervals[0]}
                progress={lane.progress}
                onClick={eventStart(() => (showButtonPanel === lane.id ? undefined : setShowButtonPanel(lane.id)))}
                isClick={lane.id === showButtonPanel}
              />
            ))}
        </div>
      </div>
      {showButtonPanel !== false && (
        <div className={style.tracks_buttons_container}>
          {lanesInfo[showButtonPanel].connected ? (
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
              goToLane(0)
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

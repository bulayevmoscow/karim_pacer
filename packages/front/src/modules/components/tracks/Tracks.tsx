import style from './Tracks.module.scss'
import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit'
import { observer } from 'mobx-react-lite'
import { useTracks } from '@modules/components/tracks/useTracks'
import { Button } from '@modules/library/Button'
import store from '@store'

export const Tracks = observer(() => {
  const { setShowButtonPanel, showButtonPanel, lanesInfo, eventStart, goToLane, startInterval } = useTracks()
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
      <div className={style.tracks_buttons_container}>
        <Button
          color="green"
          onClick={e => {
            startInterval({ id: 0, status: true })
            e.stopPropagation()
          }}
        >
          Старт
        </Button>

        <Button
          color="green"
          onClick={e => {
            startInterval({ id: 0, status: false })
            e.stopPropagation()
          }}
        >
          Стоп
        </Button>
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

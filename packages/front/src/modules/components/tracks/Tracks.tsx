import style from './Tracks.module.scss'
import { TrackUnit } from '@modules/components/tracks/Unit/TrackUnit'
import store from '@store'
import { observer } from 'mobx-react-lite'

export const Tracks = observer(() => {
  const { lanesInfo } = store
  const data = lanesInfo
  console.log('tracks', data)
  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          {lanesInfo?.map(lane => (
            <TrackUnit key={lane.id} {...lane.interval} name={lane.name} />
          ))}
        </div>
      </div>
      <div className={style.tracks_buttons_container} onClick={() => store.setInt()}>
        Some Button
      </div>
    </div>
  )
})

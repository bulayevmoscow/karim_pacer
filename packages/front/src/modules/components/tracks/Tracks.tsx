import style from './Tracks.module.scss'
import { TrackUnit } from '@modules/components/tracks/Unit/TrackUnit'

export const Tracks = () => {
  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
          <TrackUnit speed={90} distance={500} rest={20} repeat={2} tempo={400} />
        </div>
      </div>
      {/* <div className={style.tracks_buttons_container}>Some Button</div> */}
    </div>
  )
}

import { FC } from 'react'
import IconEdit from '@modules/icons/edit.svg'
import IconDelete from '@modules/icons/delete.svg'
import IconSpeed from '@modules/icons/unit/speed.png'
import IconDistance from '@modules/icons/unit/distance.png'
import IconRest from '@modules/icons/unit/rest.png'
import IconRepeat from '@modules/icons/unit/repeat.png'
import IconTempo from '@modules/icons/unit/tempo.png'

import style from './TrackUnit.module.scss'
import { TFaceSubHeader } from '@modules/library/Typeface'
type TTrackUnit = {
  speed: number
  distance: number
  rest: number
  repeat: number
  tempo: number
}

export const TrackUnit: FC<TTrackUnit> = ({ distance, rest, speed, tempo, repeat }) => {
  return (
    <div className={style.track_container}>
      <div className={style.track_header}>
        <TFaceSubHeader>Дорожка 1</TFaceSubHeader>
        <div className={style.icons_container}>
          <img src={IconEdit} alt="" />
          <img src={IconDelete} alt="" />
        </div>
      </div>

      <div className={style.track_data_container}>
        <div className={style.unit}>
          <img src={IconSpeed} alt="" />
          {speed}
        </div>

        <div className={style.unit}>
          <img src={IconDistance} alt="" />
          {distance}
        </div>

        <div className={style.unit}>
          <img src={IconRest} alt="" />
          {rest}
        </div>

        <div className={style.unit}>
          <img src={IconRepeat} alt="" />
          {repeat}
        </div>

        <div className={style.unit}>
          <img src={IconTempo} alt="" />
          {tempo}
        </div>
      </div>
      <div
        className={style.track_progressbar}
        style={{ background: `linear-gradient(90deg, #A8E4E8 50%, transparent 50%)` }}
      />
    </div>
  )
}

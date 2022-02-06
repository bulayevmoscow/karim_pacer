import { FC } from 'react'
import IconEdit from '@modules/icons/edit.svg'
import IconDelete from '@modules/icons/delete.svg'
import IconSpeed from '@modules/icons/unit/speed.png'
import IconDistance from '@modules/icons/unit/distance.png'
import IconRest from '@modules/icons/unit/rest.png'
import IconRepeat from '@modules/icons/unit/repeat.png'
import IconTempo from '@modules/icons/unit/tempo.png'

import style from './Task.module.scss'
import { TFaceSubHeader } from '@modules/library/Typeface'

export type TTackUnit = {
  name: string
  speed?: number
  distance?: number
  rest?: number
  repeat?: number
  tempo?: number
  progress?: number
}

export const TaskUnit: FC<TTackUnit> = ({ distance, rest, speed, tempo, repeat, name, progress }) => {
  const disabledStatus = (distance ?? rest ?? speed ?? tempo ?? repeat ?? false) === false
  console.log(progress)
  return (
    <div className={style.track_container}>
      <div className={style.track_header}>
        <TFaceSubHeader>{name}</TFaceSubHeader>
        <div className={style.icons_container}>
          <img src={IconEdit} alt="" />
          <img src={IconDelete} alt="" />
        </div>
      </div>

      <div className={`${style.track_data_container} ${disabledStatus ? style.disabled : ''}`}>
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

      {progress !== undefined && (
        <div
          className={style.track_progressbar}
          style={{
            backgroundSize: `${progress}%, 0px, 0%`,
          }}
        />
      )}
    </div>
  )
}

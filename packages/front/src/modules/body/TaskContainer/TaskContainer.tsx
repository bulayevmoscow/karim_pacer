import style from './TaskContainer.module.pcss'
import { IntervalHeading, IntervalPropertyList } from '@modules/library/Typeface'
import iconDelete from '@modules/icons/task_delete.svg'
import iconEdit from '@modules/icons/task_edit.svg'
import { FC } from 'react'
import { TTask } from '@monorepo/types'

type TTaskContainer = TTask

export const TaskContainer: FC<TTaskContainer> = ({ name, speed, distance, rest, temp, repeat, progress }) => {
  const speedMinutes = Math.floor(speed / 60)
  const speedSeconds = speed - speedMinutes * 60
  const progressBar = Math.floor(((progress ?? 0) / speed) * 100)
  console.log('progress', progress)
  return (
    <div className={`${style.task_container}`}>
      <IntervalHeading className={style.task_heading} align={'center'}>
        {name}
      </IntervalHeading>
      <div
        style={{
          background: `linear-gradient(90deg, #aecfbf 0, #aecfbf ${progressBar}%, transparent ${0}%)`,
        }}
        className={`${style.task_property_container}`}
      >
        <div className={style.task_property_left}>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Скорость: </span>
            <span>
              {speedMinutes}м {speedSeconds}с на 100м
            </span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Дистанция: </span>
            <span>{distance}</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Отдых: </span>
            <span>{rest}с</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Темпотренер: </span>
            <span>{temp}мс</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Поворотов:</span>
            <span>{repeat}</span>
          </IntervalPropertyList>
        </div>
        <div className={style.task_property_right}>
          <img src={iconEdit} alt="" />
          <img src={iconDelete} alt="" />
        </div>
      </div>
    </div>
  )
}

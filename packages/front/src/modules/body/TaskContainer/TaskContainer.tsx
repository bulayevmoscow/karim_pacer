import style from './TaskContainer.module.pcss'
import { IntervalHeading, IntervalPropertyList } from '@modules/library/Typeface'
import iconDelete from '@modules/icons/task_delete.svg'
import iconEdit from '@modules/icons/task_edit.svg'

export const TaskContainer = () => {
  return (
    <div className={style.task_container}>
      <IntervalHeading className={style.task_heading} align={'center'}>
        Интервал 1
      </IntervalHeading>
      <div className={style.task_property_container}>
        <div className={style.task_property_left}>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Скорость: </span>
            <span>1м 30с на 100м</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Дистанция: </span>
            <span>200</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Отдых: </span>
            <span>20с</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Темпотренер: </span>
            <span>400мс</span>
          </IntervalPropertyList>
          <IntervalPropertyList className={style.task_property_line}>
            <span>Поворотов:</span>
            <span>10</span>
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

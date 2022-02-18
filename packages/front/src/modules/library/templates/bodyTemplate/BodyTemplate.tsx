import style from './BodyTemplate.module.scss'
import React, { FC } from 'react'

type TBodyTemplate = {
  buttonPanel?: React.ReactNode
  children: React.ReactNode
}

export const BodyTemplate: FC<TBodyTemplate> = ({ children, buttonPanel }) => {
  return (
    <div className={style.body_template}>
      <div className={style.body_template_container}>
        <div className={style.body_template_list}>{children}</div>
      </div>
      <div className={style.tracks_buttons_container}>
        <div className={style.body_template_buttons_container}>{buttonPanel}</div>
      </div>
    </div>
  )
}

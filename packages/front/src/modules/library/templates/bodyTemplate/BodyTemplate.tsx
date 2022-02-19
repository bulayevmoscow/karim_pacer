import style from './BodyTemplate.module.scss'
import React, { FC } from 'react'

const BodyButtonTemplate: FC = ({ children }) => {
  return (
    <div className={style.tracks_buttons_container}>
      <div className={style.body_template_buttons_container}>{children}</div>
    </div>
  )
}

const BodyMainTemplate: FC = ({ children }) => {
  return (
    <div className={style.body_template_container}>
      <div>
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}

const BodyTemplate: FC = ({ children }) => {
  return <div className={style.body_template}>{children}</div>
}

export default {
  Container: BodyTemplate,
  Main: BodyMainTemplate,
  Buttons: BodyButtonTemplate,
}

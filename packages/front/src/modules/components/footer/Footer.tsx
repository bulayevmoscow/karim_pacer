import React, { FC } from 'react'
import IconHome from '@modules/icons/f_home.svg'
import IconSetting from '@modules/icons/f_setting.svg'
import style from './Footer.module.scss'

type TBodyPath = {}

export const Footer: FC<TBodyPath> = () => {
  return (
    <div className={style.footer}>
      <img src={IconHome} alt="" />
      <img src={IconSetting} alt="" />
    </div>
  )
}

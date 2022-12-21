import React, { FC } from 'react';
import IconHome from '@modules/icons/f_home.svg';
import IconSetting from '@modules/icons/f_setting.svg';
import style from './Footer.module.scss';
import store from '@store';

type TBodyPath = {};

export const Footer: FC<TBodyPath> = () => {
  const { goToPage } = store;
  return (
    <div className={style.footer}>
      <img
        src={IconHome}
        onClick={() => {
          goToPage('main');
        }}
        alt=""
      />
      <img
        src={IconSetting}
        onClick={() => {
          goToPage('setting');
        }}
        alt=""
      />
    </div>
  );
};

import style from './Header.module.scss';
import { Routes, Route } from 'react-router-dom';
import { routerList } from '@modules/components/Index';
import { TFaceHeader } from '@modules/library/Typeface';
import updateIcon from '@modules/icons/update_icon.svg';
import React from 'react';

import { observer } from 'mobx-react-lite';
import store from '@store';

export const Header = observer(() => {
  const { laneID } = store;
  return (
    <div className={style.header_container}>
      <Routes>
        <Route path={routerList.home} element={<TFaceHeader>{'Home'}</TFaceHeader>} />
        <Route path={routerList.setting} element={<TFaceHeader>{'Настройки басейна'}</TFaceHeader>} />
        <Route
          path={routerList.debug}
          element={
            <>
              <TFaceHeader>{'Debug'}</TFaceHeader>
              <a href="/update">
                <img src={updateIcon} alt="" />
              </a>
            </>
          }
        />
        <Route path={routerList.lane + '/:id'} element={<TFaceHeader>{'Линия ' + laneID}</TFaceHeader>} />
        <Route path={routerList.addInterval} element={<TFaceHeader>{'Добавить интервал ' + laneID}</TFaceHeader>} />
      </Routes>
    </div>
  );
});

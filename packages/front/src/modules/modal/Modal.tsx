import { FC } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.pcss';
import React from 'react';

type TModal = {
  isOpen: boolean;
};
type TModalErrorConnect = {
  refetch: () => void;
  status: boolean;
  url?: string;
  code?: string;
};

export const Modal: FC<TModal> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.modal_container}>
        <div className={style.modal_body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export const ModalErrorConnectModule: FC<TModalErrorConnect> = ({ refetch, code, url, status }) => {
  return (
    <>
      {/* eslint-disable no-negated-condition */}
      <div style={{ marginBottom: '10px' }}>
        {!status ? <>Ошибка подключения</> : ''}
        {!status && url && code && (
          <div>
            [{code}] {url}
          </div>
        )}
      </div>

      {!status ? <button onClick={refetch}>Попробовать заново?</button> : null}
    </>
  );
};

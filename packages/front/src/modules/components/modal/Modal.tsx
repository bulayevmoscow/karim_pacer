import { createPortal } from 'react-dom';
import store from '@store';
import { observer } from 'mobx-react-lite';
import style from './Modal.module.scss';
import { useState } from 'react';
const ModalError = observer(() => {
  const { fetchErrorList } = store;
  const [progress, changeProgress] = useState(false);
  if (fetchErrorList.length === 0) {
    return null;
  }

  const error = fetchErrorList[0];
  const onClick = () => {
    if (error.onClick) {
      changeProgress(true);
      error?.onClick().finally(() => {
        changeProgress(false);
      });
    }
  };

  return (
    <>
      <div key={error.title} className={style.container}>
        <h1>{error.title}</h1>
        <p>{error.description}</p>
        <button onClick={onClick} disabled={progress}>
          {progress ? 'Progress' : 'Click'}
        </button>
      </div>
    </>
  );
});

export const Modal = () => {
  return createPortal(
    <ModalError />,
    document.querySelector('#modal') as Element
  );
};

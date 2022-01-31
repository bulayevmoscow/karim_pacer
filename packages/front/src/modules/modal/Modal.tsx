import { FC } from 'react'
import ReactDOM from 'react-dom'
import style from './Modal.module.pcss'
import { ProgressBar } from '@modules/library/ProgressBar'

type TModal = {
  isOpen: boolean
}
type TModalErrorConnect = {
  refetch: () => void
  status: boolean
  url?: string
  code?: string
}

export const Modal: FC<TModal> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.modal_container}>
        <div className={style.modal_body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export const ModalErrorConnectModule: FC<TModalErrorConnect> = ({ refetch, code, url, status }) => {
  return (
    <>
      {/* eslint-disable no-negated-condition */}
      {!status ? <>Ошибка подключения</> : ''}
      {!status && url && code && (
        <div>
          [{code}] {url}
        </div>
      )}
      {!status ? <button onClick={refetch}>Попробовать подключиться?</button> : <ProgressBar />}
    </>
  )
}

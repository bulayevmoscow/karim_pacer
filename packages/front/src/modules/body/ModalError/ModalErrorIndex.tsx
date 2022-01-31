import { Modal, ModalErrorConnectModule } from '@modules/modal/Modal'
import { FC } from 'react'

type TModalErrorConnect = {
  isShow: boolean
  refetch: () => void
  url?: string
  code?: string
  status: boolean
}

export const ModalErrorConnect: FC<TModalErrorConnect> = ({ isShow, refetch, url, code, status }) => {
  return (
    <Modal isOpen={isShow}>
      <ModalErrorConnectModule refetch={refetch} code={code} url={url} status={status} />
    </Modal>
  )
}

import style from './Toggle.module.pcss'
import { FC } from 'react'

type TToggle = {
  value?: boolean
  dispatcher: () => void
}

export const Toggle: FC<TToggle> = ({ value, dispatcher }) => {
  return (
    <label
      className={style.switch}
      onClick={e => {
        dispatcher()
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <input type="checkbox" checked={value === true} readOnly={true} />
      <i></i>
    </label>
  )
}

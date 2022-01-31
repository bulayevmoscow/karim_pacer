import style from './Toggle.module.pcss'
import { FC } from 'react'

type TToggle = {
  value?: boolean
  dispatcher: () => void
  className?: string
}

export const Toggle: FC<TToggle> = ({ value, dispatcher, className }) => {
  return (
    <label
      className={`${style.switch} ${className ? className : ''}`}
      onClick={e => {
        dispatcher()
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <input type="checkbox" checked={value === true} readOnly={true} />
      <i />
    </label>
  )
}

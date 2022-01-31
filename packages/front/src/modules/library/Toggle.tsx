import style from './Toggle.module.pcss'
import { FC } from 'react'

type TToggle = {
  value?: boolean
  dispatcher: () => void
}

export const Toggle: FC<TToggle> = ({ value, dispatcher }) => {
  // const ref = useRef<HTMLInputElement>(null)
  // useLayoutEffect(() => {
  //     ref?.current?.addEventListener('click', (e) => {
  //         e.preventDefault()
  //     })
  // }, [ref])
  return (
    <label
      className={style.switch}
      onClick={e => {
        dispatcher()
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <input type="checkbox" checked={value === true} onChange={dispatcher} />
      <span className={`${style.slider} ${style.round}`} />
    </label>
  )
}

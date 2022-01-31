import { FC } from 'react'
import style from './Typeface.module.pcss'

type TTypeFace = {
  className?: string
  align?: 'left' | 'right' | 'center'
}

export const IntervalHeading: FC<TTypeFace> = ({ children, className, align = 'left' }) => {
  return (
    <h2
      className={`${style.IntervalHeading} ${className ?? ''}`}
      style={{
        textAlign: align,
      }}
    >
      {children}
    </h2>
  )
}

export const IntervalPropertyList: FC<TTypeFace> = ({ children, className, align = 'left' }) => {
  return (
    <div
      className={`${style.IntervalPropertyList} ${className ?? ''}`}
      style={{
        textAlign: align,
      }}
    >
      {children}
    </div>
  )
}

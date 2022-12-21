import { FC } from 'react';
import style from './Typeface.module.scss';
type TTypeFace = {
  className?: string;
  align?: 'left' | 'right' | 'center';
};

export const TFaceHeader: FC<TTypeFace> = ({
  align = 'left',
  className,
  children,
}) => {
  if (!children) {
    return null;
  }

  return (
    <h2
      style={{
        textAlign: align,
      }}
      className={`${style.resetMargin} ${style.nav_header} ${className ?? ''}`}
    >
      {children}
    </h2>
  );
};

export const TFaceSubHeader: FC<TTypeFace> = ({
  align,
  className,
  children,
}) => {
  return (
    <h3
      style={{
        textAlign: align,
      }}
      className={`${style.resetMargin} ${style.sub_header} ${className ?? ''}`}
    >
      {children}
    </h3>
  );
};

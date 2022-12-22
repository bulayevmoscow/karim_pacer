import style from './ColorInput.module.scss';
import { FC } from 'react';
import { TInputComponentProps } from './types';
import React from 'react';

export const ColorInput: FC<TInputComponentProps> = ({ onChange, className, value }) => {
  return (
    <input
      type="color"
      value={value}
      className={[className, style.input].filter((x) => x).join(' ')}
      onChange={onChange}
    />
  );
};

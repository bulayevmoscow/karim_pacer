import React, { useRef } from 'react';
import { TInputComponentProps } from './types';
import { selectAllInput } from '@utils/events';

export const NumberInput: React.FC<TInputComponentProps> = ({ onChange, className, value }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      type="number"
      onChange={onChange}
      onClick={selectAllInput}
      value={value}
      className={[className].filter((x) => x).join(' ')}
    />
  );
};

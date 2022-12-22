import { FC } from 'react';
import { TInputComponentProps } from './types';
import React from 'react';

export const Select: FC<
  TInputComponentProps<{ value: string; alias: string }[], HTMLSelectElement> & { current: number }
> = ({ value, current, onChange, className }) => {
  return (
    <select onChange={onChange} defaultValue={current} className={className}>
      {value.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.alias}
          </option>
        );
      })}
    </select>
  );
};

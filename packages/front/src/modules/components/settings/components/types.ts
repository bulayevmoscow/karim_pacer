import React from 'react';

export type TInputComponentProps<V = string, T = HTMLInputElement> = {
  value: V;
  onChange: React.ChangeEventHandler<T>;
  className?: string;
};

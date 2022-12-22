import React from 'react';

export const selectAllInput: React.MouseEventHandler<HTMLInputElement> = (e) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  e.target?.select();
};

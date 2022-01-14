import React from 'react';

export interface TContext {
    sysInfo: number,
    additionalInfo: number
    appInfo: {
        tab: 0 | 1 | 2
    }
}

export

const Context = React.createContext<TContext>({
  sysInfo: 0,
  additionalInfo: 123,
  appInfo: {
    tab: 0,
  },

});

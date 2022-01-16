import React, { useContext, useMemo, useState } from 'react';
import { Context, TContext } from './context/context';
import { Header } from './header';

function App() {
  const [sysInfo, setSysInfo] = useState<TContext['sysInfo']>(0);
  const [additionalInfo, setAdditionalInfo] = useState<TContext['additionalInfo']>(0);
  const [appInfo, setAppInfo] = useState<TContext['appInfo']>({ tab: 0 });

  // posts[0].perks[3].value = "some"

  const value = useMemo(() => ({
    sysInfo,
    additionalInfo,
    appInfo,
  }), [sysInfo, additionalInfo, appInfo]);

  console.log(value.sysInfo);
  return (

    <Context.Provider value={value}>
      <div className="App">
        <Header someNumber={123} />
      </div>
    </Context.Provider>

  );
}

export default App;

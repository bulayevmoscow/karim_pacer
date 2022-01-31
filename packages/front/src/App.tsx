import './App.css'
import { Body } from '@modules/body/Body'
import React from 'react'
import { Provider } from '@context'

const App = () => {
  return (
    <Provider>
      <Body />
    </Provider>
  )
}

export default App

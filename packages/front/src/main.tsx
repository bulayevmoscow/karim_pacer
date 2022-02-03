import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { setTemplateTasks } from '@utils/templateTasks'

setTemplateTasks()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

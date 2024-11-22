import React from 'react'
import ReactDOM from 'react-dom/client'
import  {RouteApp}  from './route'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteApp></RouteApp>
    </Provider>
  </React.StrictMode>
)

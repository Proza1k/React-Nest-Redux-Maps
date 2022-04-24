import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAppDispatch } from 'src/redux/hooks'
import { Provider } from 'react-redux'

import { store } from 'src/redux/store'

import './App.module.scss'
import { AppRouter } from './pages'
import { Header } from './components/Header/Header'
import { GET_BUS } from './redux/reducers/busReducer'
import { GET_MAP } from './redux/actions/map.actions'

function App() {
  const dispatch = useAppDispatch()
  dispatch(GET_BUS(null))
  dispatch(GET_MAP())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App

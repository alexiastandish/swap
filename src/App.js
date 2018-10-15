import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import axios from 'axios'
import Routes from './Routes'
import SideBar from './components/SideBar/SideBar'
import './App.scss'
import { Provider } from 'react-redux'
import store from './ducks/store'
import User from './User'
import Nav from './components/Nav/Nav'

function App() {
  return (
    <Provider store={store}>
      <User>
        <BrowserRouter>
          <div className="App">
            <SideBar />
            <div className="body-container">
              <Nav />
              <Routes />
            </div>
          </div>
        </BrowserRouter>
      </User>
    </Provider>
  )
}

export default App

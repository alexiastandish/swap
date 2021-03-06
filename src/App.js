import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import SideBar from './components/SideBar/SideBar'
import './App.scss'
import { Provider } from 'react-redux'
import store from './ducks/store'
import User from './User'
import Nav from './components/Nav/Nav'
import SideBarMobile from './components/SideBarMobile/SideBarMobile'

function App() {
  return (
    <Provider store={store}>
      <User>
        <BrowserRouter>
          <div className="App">
            <SideBar />
            <SideBarMobile />
            <div className="body-container" id="right">
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

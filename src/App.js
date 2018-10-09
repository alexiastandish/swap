import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import SideBar from './components/SideBar/SideBar'
import './App.scss'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <SideBar />
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
}

export default App

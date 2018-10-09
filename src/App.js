import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Routes from './Routes'
import SideBar from './components/SideBar/SideBar'
import './App.scss'
import getItem from './api/getItem'

class App extends Component {
  componentDidMount() {
    axios.get('/api/users').then(res => {
      console.log('users', res)
    })
    getItem(1)
  }

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

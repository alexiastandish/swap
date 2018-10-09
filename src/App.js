import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import axios from 'axios'
import Routes from './Routes'
import SideBar from './components/SideBar/SideBar'
import './App.scss'

class App extends Component {
  // componentDidMount() {
  //   axios.get('/api/users').then(res => {
  //     console.log('users', res)
  //   })
  //   getItem(1)
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SideBar />
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
}

export default App

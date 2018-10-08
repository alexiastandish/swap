import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

// import store from './ducks/store'
// import About from './components/About/About'
// import SideBar from './components/SideBar/SideBar'
// import { Link } from 'react-router-dom'
import './App.scss'

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <div>{Routes}</div>
      </BrowserRouter>
    )
  }
}

export default App

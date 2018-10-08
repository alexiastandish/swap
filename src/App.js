import React, { Component } from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './ducks/store'
// import About from './components/About/About'
// import SideBar from './components/SideBar/SideBar'
// import { Link } from 'react-router-dom'
import '../src/sass/sass.scss'

class App extends Component {
  render() {
    return (
      <div>
        <div className="landing-page">
          <div className="landing-container">
            <div className="logo">
              <img src="http://i66.tinypic.com/nb6452.png" alt="swap-logo" />
            </div>
            <button>SIGN IN</button>
            <button>SIGN UP</button>
            <button>ABOUT</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App

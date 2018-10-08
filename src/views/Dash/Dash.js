import React, { Component } from 'react'
import SideBar from '../../components/SideBar/SideBar'
// import { Link } from 'react-router-dom'

class Dash extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    )
  }
}

export default Dash

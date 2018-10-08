import React, { Component } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './Dash.scss'

class Dash extends Component {
  render() {
    return (
      <div className="dash-container">
        <SideBar />
      </div>
    )
  }
}

export default Dash

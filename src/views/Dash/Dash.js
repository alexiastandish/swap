import React, { Component } from 'react'
import './Dash.scss'
import Nav from '../../components/Nav/Nav'

class Dash extends Component {
  render() {
    return (
      <div className="dash-container">
        <Nav />
      </div>
    )
  }
}

export default Dash

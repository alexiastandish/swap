import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

class Dash extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return <div className="dash-container" />
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  null
)(Dash)

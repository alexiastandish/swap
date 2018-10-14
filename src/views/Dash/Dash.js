import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

class Dash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
    }
  }

  componentDidMount(id) {
    axios.get(`/api/user/${id}`).then(response => {
      // console.log('response.data', response.data)
      this.setState(response)
    })
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

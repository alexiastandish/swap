import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from '../../components/Nav/Nav'
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
    console.log('this.props.id', this.props.id)
    return (
      <div className="dash-container">
        <Nav />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.currentUser })

export default connect(
  mapStateToProps,
  null
)(Dash)

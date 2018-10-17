import React, { Component } from 'react'
import './Offers.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

class Offers extends Component {
  constructor(props) {
    super(props)
    this.state = { offers: [] }
  }

  componentDidMount() {
    axios.get(`/api/offers/${this.props.user.user_id}`).then(response => {
      this.setState({ offers: response })
    })
  }

  render(props) {
    console.log('this.state.offers', this.state.offers)
    console.log('this.state', this.state)
    return <div className="offers-container" />
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    item: state.item,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers)

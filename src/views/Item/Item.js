import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Item extends Component {
  goToItem(id) {
    this.props.getItem(id)
  }
  render() {
    return <div />
  }
}

const mapStateToProps = ({ item }) => ({ ...item })

export default withRouter(
  connect(
    mapStateToProps,
    { getItem }
  )(Item)
)

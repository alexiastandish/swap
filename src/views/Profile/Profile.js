import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getItems } from '../../ducks/itemsReducer'
import { getUserId } from '../../ducks/userReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  componentDidMount() {
    this.props.getItems()
    this.props.getUserId()
  }
  render() {
    return (
      <div className="dash-container">
        <Nav />
        <ItemCard />
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => ({
  ...items,
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getItems,
      getUserId,
    }
  )(Profile)
)

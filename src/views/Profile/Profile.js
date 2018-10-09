import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { itemsReducer } from '../../ducks/itemsReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  componentDidMount() {
    // this.props.getUserItems()
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

export default Profile

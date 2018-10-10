import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getProfileItems } from '../../ducks/itemsReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileItems()
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
      getProfileItems,
    }
  )(Profile)
)

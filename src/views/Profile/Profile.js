import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getItems } from '../../ducks/itemsReducer'
import { getUserById } from '../../ducks/userReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: {},
    }
  }
  componentDidMount() {
    this.props.getItems()
    this.props.getUserById()
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
      getUserById,
    }
  )(Profile)
)

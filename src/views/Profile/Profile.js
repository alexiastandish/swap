import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getUser } from '../../ducks/userReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  constructor() {
    super()

    this.state = {
      itemCards: [],
    }
  }

  componentDidMount() {
    // this.props.user_id userId
    this.props.getUserItems(2)
    this.props.getImages(2)
    this.props.getUser(2)
  }

  render() {
    const itemCards = this.props.items.map(item => {
      return (
        <div className="item-card" key={item.item_name}>
          <ItemCard item={item} images={this.props.images} user={this.props.user} />
        </div>
      )
    })

    console.log('this.props', this.props)
    console.log('itemCards', itemCards)

    return <div className="profile-container">{itemCards}</div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, getUserItems, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

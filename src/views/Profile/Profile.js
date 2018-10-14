import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import { getImages } from '../../ducks/imagesReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    this.props.getUserItems(this.props.user.user_id).then(idk => {
      console.log('idk', idk)
      idk.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div className="profile-container">
        {this.props.items.map(item => {
          return (
            <div className="item-card" key={item.item_name}>
              <ItemCard item={item} images={this.props.images} user={this.props.user} />
            </div>
          )
        })}
      </div>
    )
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
  return bindActionCreators({ getUserItems, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

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
    this.props.getUserItems(this.props.match.params.id).then(response => {
      console.log('response.value', response.value)
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  render() {
    console.log('this.props.PROFILE', this.props)
    return (
      <div className="profile-container">
        {this.props.items.map(item => {
          return (
            <div className="item-card" key={item.items_id}>
              <ItemCard
                item={item}
                images={this.props.images[item.items_id]}
                user={this.props.user}
              />
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

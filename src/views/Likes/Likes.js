import React, { Component } from 'react'
import { getLikes } from '../../ducks/likesReducer'
import './Likes.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import LikeCard from '../../components/LikeCard/LikeCard'

class Likes extends Component {
  componentDidMount() {
    this.props.getLikes(this.props.user.user_id).then(response => {
      response.value.forEach(item => {
        // console.log('response.value', response.value)
        this.props.getImages(item.items_id)
      })
    })
  }

  render() {
    // console.log('this.props', this.props)
    // console.log('this.props.images', this.props.images)
    return (
      <div className="likes-container" style={{ width: '72vw', margin: '0 auto' }}>
        {this.props.likes &&
          this.props.likes.map(like => {
            return (
              <div className="like-item" style={{ margin: '0px' }} key={like.items_id}>
                <LikeCard
                  item={like}
                  images={this.props.images[like.items_id]}
                  style={{ margin: '0px' }}
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
    likes: state.likes,
    item: state.item,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLikes, getItem, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Likes)

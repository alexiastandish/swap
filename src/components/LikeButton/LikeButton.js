import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserHearts, addLike } from '../../ducks/likesReducer'
import axios from 'axios'

class LikeButton extends Component {
  constructor() {
    super()

    this.addToLikes = this.addToLikes.bind(this)
    this.removeLike = this.removeLike.bind(this)
  }

  componentDidMount() {
    this.props.getUserHearts(this.props.user.user_id).then(response => {
      return Object.values(response.value)
    })
  }

  removeLike() {
    axios
      .delete(`/api/like/${this.props.item.items_id}`)
      .then(() => this.props.getUserHearts(this.props.user.user_id))
  }

  addToLikes(likeDetails) {
    axios
      .post('/api/like', likeDetails)
      .then(() => this.props.getUserHearts(this.props.user.user_id))
  }

  render() {
    const isLiked =
      Object.values(this.props.likes).findIndex(like => {
        return (
          this.props.item && this.props.item.items_id && like.postid === this.props.item.items_id
        )
      }) !== -1

    return (
      <div>
        {isLiked ? (
          <i
            id="like-button"
            className="fa fa-2x fa-heart like"
            onClick={() => this.removeLike(this.props.item.items_id)}
          />
        ) : (
          <i
            id="like-button"
            className="fa fa-2x fa-heart-o not-liked"
            onClick={() =>
              this.addToLikes({
                likinguser: this.props.user && this.props.user.user_id,
                postedbyid: this.props.item && this.props.item.item_userid,
                postid: this.props.item && this.props.item.items_id,
              })
            }
          />
        )}
        <div className="item-image">
          {this.props.images &&
            this.props.images
              .filter(image => image.imageurl_itemid === this.props.item.items_id)
              .map(image => (
                <div key={image.image_id}>
                  <img className="item-card-image-container" src={image.imageurl} alt="default" />
                </div>
              ))[0]}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userHearts: state.userHearts,
    likes: state.likes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserHearts, addLike }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeButton)

import React, { Component } from 'react'
import './ItemCard.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getUserHearts, addLike } from '../../ducks/likesReducer'
// import LikeButton from '../../components/LikeButton/LikeButton'
import axios from 'axios'
// import { getItem } from '../../ducks/itemReducer'

class ItemCard extends Component {
  constructor() {
    super()

    this.addToLikes = this.addToLikes.bind(this)
    this.removeLike = this.removeLike.bind(this)
    // this.updateLikes = this.updateLikes.bind(this)
  }

  componentDidMount() {
    this.props.getUserHearts(this.props.user.user_id).then(response => {
      // console.log('response.value', response.value)
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
        return like.postid === this.props.item.items_id
      }) !== -1
    // console.log('isLiked', isLiked)
    // console.log('this.props.userHearts', this.props.userHearts)
    return (
      <div className="item-card-container">
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

        <Link to={`/item/${this.props.item.items_id}`}>
          <div className="item-description">
            <h1>
              <span>Item: </span>

              <br />
              {this.props.item.item_name}
            </h1>

            <p>
              <span>Description: </span> {this.props.item.item_description}
            </p>
            <p>
              <span className="timestamp-text">{this.props.item.post_time}</span>
            </p>
          </div>
        </Link>
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
)(ItemCard)

import React, { Component } from 'react'
import './ItemCard.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getUserHearts } from '../../ducks/likesReducer'
import LikeButton from '../../components/LikeButton/LikeButton'
import axios from 'axios'

class ItemCard extends Component {
  constructor() {
    super()

    this.state = {
      isNotLiked: false,
      isLiked: true,
      noLike: 'fa fa-2x fa-heart-o empty',
      like: 'fa fa-2x fa-heart full',
    }

    this.addToLikes = this.addToLikes.bind(this)
    this.toggleLike = this.toggleLike.bind(this)
    // this.removeLike = this.removeLike.bind(this)
    this.handleHeartClick = this.handleHeartClick.bind(this)
  }

  componentDidMount() {
    this.props.user &&
      this.props.getUserHearts(this.props.user.user_id).then(response => {
        console.log('response.value', response.value)
      })
  }

  toggleLike() {
    this.setState({ isNotLiked: !this.state.isNotLiked })
  }

  addToLikes(likeDetails) {
    axios.post(`/api/addItem`, {
      ...likeDetails,
      userId: this.props.user.user_id,
    })
  }

  handleHeartClick() {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }))
  }

  render() {
    const likeCheck = this.props.userHearts.find(like => like.postid === this.props.item.items_id)
    console.log('this.props.userHearts', this.props.userHearts)
    console.log('this.props', this.props)
    return (
      <div className="item-card-container">
        <LikeButton
          isLiked={this.state.isLiked}
          isNotLiked={this.state.isNotLIked}
          emptyHeart={this.state.noLike}
          fullHeart={this.state.like}
          likeCheck={likeCheck}
          toggleLike={this.toggleLike}
          addLike={this.addToLikes}
          user={this.props.user}
          itemInfoForLike={this.props.item}
          toggleLike={this.props.toggleLike}
        />
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserHearts }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCard)

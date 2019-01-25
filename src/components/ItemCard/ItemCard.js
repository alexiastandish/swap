import React, { Component, Fragment } from 'react'
import './ItemCard.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getUserHearts, addLike } from '../../ducks/likesReducer'
import axios from 'axios'

class ItemCard extends Component {
  constructor() {
    super()

    this.addToLikes = this.addToLikes.bind(this)
    this.removeLike = this.removeLike.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
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
    // .then(() => this.refreshPage())
  }

  refreshPage() {
    window.location.reload()
  }

  render() {
    // console.log('this.props', this.props)
    const isLiked =
      Object.values(this.props.likes).findIndex(like => {
        return like.postid === this.props.item.items_id
      }) !== -1

    const itemDescription =
      this.props.item.item_description.length >= this.props.descLimit
        ? this.props.item.item_description.slice(0, this.props.descLimit) + '...'
        : this.props.item.item_description
    return (
      <div className="dash-container__item-card">
        {isLiked ? (
          <i
            style={{ color: '#2acbdc' }}
            id="like-button"
            className="fa fa-2x fa-heart like"
            onClick={() => this.removeLike(this.props.item.items_id)}
          />
        ) : (
          <i
            id="like-button"
            style={{ color: '#2acbdc' }}
            className="fa fa-2x fa-heart-o like"
            onClick={() =>
              this.addToLikes({
                likinguser: this.props.user && this.props.user.user_id,
                postedbyid: this.props.item && this.props.item.item_userid,
                postid: this.props.item && this.props.item.items_id,
              })
            }
          />
        )}
        <Fragment>
          {this.props.images &&
            this.props.images
              .filter(image => image.imageurl_itemid === this.props.item.items_id)
              .map(image => (
                <Fragment key={image.image_id}>
                  <Link to={`/item/${image.items_id}`}>
                    <img
                      className="dash-container__item-card--image dash-container__item-card--hover"
                      src={image.imageurl}
                      alt="default"
                    />
                  </Link>
                </Fragment>
              ))[0]}
        </Fragment>

        <div className="item-description">
          <Link to={`/item/${this.props.item.items_id}`}>
            <h1 className="heading-secondary">{this.props.item.item_name}</h1>

            {/* <p className="heading-secondary__desc">{this.props.item.item_description}</p> */}
            <p className="heading-secondary__desc">{itemDescription}</p>

            <p className="heading-secondary__desc--timestamp">{this.props.item.post_time}</p>
          </Link>
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
)(withRouter(ItemCard))

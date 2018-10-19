import React, { Component } from 'react'

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleLike = this.handleLike.bind(this)
  }

  handleLike() {
    const { items_id, item_userid } = this.props.itemInfoForLike
    const { user_id } = this.props.user
    this.props.addLike({ items_id, item_userid, user_id })
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div>
        {this.props.likeCheck ? (
          <i id="like-button" className={this.props.fullHeart} value={this.props.isLiked} />
        ) : (
          <i
            id="like-button"
            className={this.props.emptyHeart}
            value={this.props.isNotLiked}
            onClick={this.handleLike}
            // onClick={() =>
            //   this.props &&
            //   this.props
            //     .addLike(
            //       this.props.
            //       // this.props.itemInfoForLike.items_id,
            //       // this.props.itemInfoForLike.item_userid,
            //       // this.props.user.user_id
            //     )
            //     .then(() => this.handleLike())
            // }
            // />
          />
        )}
      </div>
    )
  }
}
// ;<button className="close-mobile-button" onClick={() => this.setState({ isToggleOn: false })}>
//   Close Menu
// </button>

export default LikeButton

import React, { Component } from 'react'

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // postid: undefined,
      // postedbyid: undefined,
      // likinguser: undefined,
    }

    // this.handleLike = this.handleLike.bind(this)
  }

  // handleLike() {
  //   const { postid, postedbyid, likinguser } = this.state
  //   // const { user_id } = this.props.user
  //   this.props.addLike(this.setState({ postid, postedbyid, likinguser }))
  // }

  render() {
    const likeCheck = this.props.userHearts.find(like => like.postid === this.props.item.items_id)

    return (
      <div>
        {likeCheck ? (
          <i
            id="like-button"
            className={this.props.fullHeart}
            // value={this.props.isLiked && this.props.isLiked}
          />
        ) : (
          <i
            id="like-button"
            className={this.props.emptyHeart}
            // value={this.props.isNotLiked}
            onClick={() => this.props.addLike(this.props.item.items_id, this.props.item.items_id)}
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

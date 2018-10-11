import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemsReducer'
import { getUserLikes } from '../../ducks/likesReducer'
import { saveItem } from '../../ducks/likesReducer'
import { getUserById } from '../../ducks/userReducer'

class ItemCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      noLike: 'fa fa-2x fa-heart-o not-liked',
      liked: 'fa fa-2x fa-heart liked',
    }
    this.getUserById = this.getUserById.bind(this)
  }

  getUserById(id) {
    this.setState({ user: this.props.user(id) })
  }
  componentDidMount() {
    getUserById()
    this.props.user && this.props.getUserLikes(this.props.user.userid)
  }

  render(props) {
    console.log('user', this.props.user)
    console.log('this.props', this.props)
    return (
      <div>
        <div className="item-card-container">
          <div className="card-section" onClick={() => this.getItem(this.props.id)}>
            <div
              style={{ backgroundImage: `url(${this.props.image})` }}
              className="default-image"
            />

            <div className="item-card-text">
              <div className="item-title">{this.props.item_name}</div>
              <div className-="item-description">{this.props.item_description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ items, user }) => ({ ...items, ...user })

export default connect(
  mapStateToProps,
  { getItem, saveItem, getUserLikes, getUserById }
)(ItemCard)

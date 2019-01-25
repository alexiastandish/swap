import React, { Component, Fragment } from 'react'
import './Dash.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemFeed } from '../../ducks/dashReducer'
import { getImages } from '../../ducks/imagesReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Dash extends Component {
  componentDidMount() {
    this.props.getItemFeed(this.props.user.user_id).then(response => {
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }
  render() {
    const descLimit = 40
    return (
      <div className="dash-container dash-space-around">
        {this.props.dashItems.map((dashItem, index) => {
          return (
            <Fragment key={index}>
              <ItemCard
                item={dashItem}
                images={this.props.images[dashItem.items_id]}
                user={this.props.user}
                descLimit={descLimit}
              />
            </Fragment>
          )
        })}
      </div>
      // </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    dashItems: state.dashItems,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItemFeed, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash)

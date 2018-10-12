import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Profile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItems } from '../../ducks/itemReducer'
// import { getUser } from '../../ducks/userReducer'
import ItemCard from '../../components/ItemCard/ItemCard'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }
  }
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    return (
      <div className="dash-container">
        <Nav />
        <ItemCard />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItems }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

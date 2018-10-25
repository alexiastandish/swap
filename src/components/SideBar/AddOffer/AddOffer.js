import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

class AddOffer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedUser: this.props.following && this.props.following[0].user_id,
      selectedUserItems: [],
      loggedInUserItems: [],
      selectedItemId: '',
      selectedLoggedInUserItemId: '',
    }

    this.handleItemSelect = this.handleItemSelect.bind(this)
    this.handleUserSelect = this.handleUserSelect.bind(this)
    this.handleLoggedInUserItemSelect = this.handleLoggedInUserItemSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSelectedUserItems = this.getSelectedUserItems.bind(this)
    this.getLoggedInUserItems = this.getLoggedInUserItems.bind(this)
  }

  componentDidMount() {
    this.getSelectedUserItems()
    this.getLoggedInUserItems()
  }

  handleItemSelect(e) {
    this.setState({ selectedItemId: e.target.value })
  }

  handleLoggedInUserItemSelect(e) {
    this.setState({ selectedLoggedInUserItemId: e.target.value })
  }

  handleUserSelect(e) {
    this.setState({ selectedUser: e.target.value }, this.getSelectedUserItems)
  }

  getSelectedUserItems() {
    axios.get(`/api/items/${this.state.selectedUser}`).then(({ data }) => {
      this.setState({
        selectedUserItems: data,
        selectedItemId: data.length > 0 ? data[0].items_id : '',
      })
    })
  }

  getLoggedInUserItems() {
    axios.get(`/api/items/${this.props.user.user_id}`).then(({ data }) => {
      console.log('data', data)
      this.setState({
        loggedInUserItems: data,
        selectedLoggedInUserItemId: data.length > 0 ? data[0].items_id : '',
      })
    })
  }

  handleSubmit() {
    axios
      .post('/api/newOffer', {
        yourId: this.props.user.user_id,
        yourItemId: this.state.selectedLoggedInUserItemId,
        theirId: this.state.selectedUser,
        theirItemId: this.state.selectedItemId,
      })
      .then(this.props.onRequestClose)
  }

  render() {
    console.log('this.state', this.state)

    return (
      <Modal
        isOpen
        onRequestClose={this.props.onRequestClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(253, 253, 253, 0.8)',
            zIndex: 10,
          },
          content: {
            width: '40vw',
            height: '50vh',
            margin: '0 auto',
            top: '22vh',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <button onClick={this.props.onRequestClose}>Close</button>
        <div className="add-item-container">
          <h1>Add Offer</h1>
          <label>I would like to swap my: </label>
          <select
            value={this.state.selectedLoggedInUserItemId}
            onChange={this.handleLoggedInUserItemSelect}
          >
            {this.state.loggedInUserItems.map(item => (
              <option key={item.items_id} value={item.items_id}>
                {item.item_name}
              </option>
            ))}
          </select>
          <label>with: </label>
          <select value={this.state.selectedUser} onChange={this.handleUserSelect}>
            {this.props.following.map(user => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
          </select>
          <label>for their: </label>
          <select value={this.state.selectedItemId} onChange={this.handleItemSelect}>
            {this.state.selectedUserItems.map(item => (
              <option key={item.items_id} value={item.items_id}>
                {item.item_name}
              </option>
            ))}
          </select>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Modal>
    )
  }
}

export default AddOffer

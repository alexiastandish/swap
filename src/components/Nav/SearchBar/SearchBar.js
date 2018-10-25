import React, { Component } from 'react'
import Downshift from 'downshift'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../Nav/Nav.scss'

export default class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      allUsers: [],
    }

    this.fetchAllUsers = this.fetchAllUsers.bind(this)
    this.inputOnChange = this.inputOnChange.bind(this)
    this.downshiftOnChange = this.downshiftOnChange.bind(this)
  }

  inputOnChange(event) {
    if (!event.target.value) {
      return
    }
    this.fetchAllUsers(event.target.value)
  }

  downshiftOnChange(selectedUser) {
    alert(`you selected user ${selectedUser.username}`)
  }

  fetchAllUsers() {
    axios.get(`/api/users`).then(response => {
      console.log('response', response)
      this.setState({ allUsers: response.data })
    })
  }

  render() {
    return (
      <div className="search-bar-container">
        <Downshift
          onChange={this.downshiftOnChange}
          itemToString={item => (item ? item.title : '')}
        >
          {({
            selectedItem,
            getInputProps,
            getItemProps,
            highlightedIndex,
            isOpen,
            inputValue,
            getLabelProps,
          }) => {
            return (
              <div>
                <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()} />
                <br />
                <input
                  {...getInputProps({
                    placeholder: 'Search All Users',
                    onChange: this.inputOnChange,
                  })}
                />
                {isOpen && (
                  <div className="downshift-dropdown" style={{ marginTop: '0px' }}>
                    {inputValue &&
                      this.state.allUsers
                        .filter(user =>
                          user.username.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((user, index) => {
                          return (
                            <div
                              className="dropdown-item"
                              {...getItemProps({ key: index, index, user })}
                              style={{
                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === user ? 'bold' : 'normal',
                                marginTop: '0px',
                              }}
                            >
                              <Link to={`/profile/${user.user_id}`}>{user.username}</Link>
                            </div>
                          )
                        })}
                  </div>
                )}
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

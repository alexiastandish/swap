import React, { Component } from 'react'
import Downshift from 'downshift'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../Nav/Nav.scss'
import './SearchBar.scss'

export default class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      allUsers: [],
    }

    this.fetchAllUsers = this.fetchAllUsers.bind(this)
    this.inputOnChange = this.inputOnChange.bind(this)
    // this.downshiftOnChange = this.downshiftOnChange.bind(this)
  }

  inputOnChange(event) {
    if (!event.target.value) {
      return
    }
    this.fetchAllUsers(event.target.value)
  }

  downshiftOnChange(selectedUser) {
    window.location.reload(selectedUser)
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
          item={this.state.allUsers}
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
                <label style={{ display: 'block' }} {...getLabelProps()} />
                <br />
                <input
                  {...getInputProps({
                    // className: 'fa fa-2x fa-heart like',
                    placeholder: 'Search Users',
                    onChange: this.inputOnChange,
                  })}
                />
                {isOpen && (
                  <div
                    className="downshift-dropdown"
                    style={{
                      position: 'absolute',
                      width: '220px',
                    }}
                  >
                    {inputValue &&
                      this.state.allUsers
                        .filter(item =>
                          item.username.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((item, index) => {
                          return (
                            <div
                              className="dropdown-item"
                              {...getItemProps({ key: index, index, item })}
                            >
                              {/* {this.downshiftOnChange(item.user_id)} */}
                              <Link to={`/profile/${item.user_id}`} className="dropdown-item">
                                {item.username}
                              </Link>
                              {this.downshiftOnChange}
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

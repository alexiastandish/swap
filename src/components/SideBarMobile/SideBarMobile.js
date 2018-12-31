import React, { Component } from 'react'
import Toggle from '../Toggle/Toggle'
import SideBar from '../SideBar/SideBar'

class SideBarMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: false,
    }
  }
  render() {
    return (
      <div>
        <Toggle>
          <h1>SideBarMobile</h1>
          <i
            className="fa fa-2x fa-circle toggle-button-mobile"
            style={{
              fontSize: '24px',
              zIndex: '999999',
            }}
            onClick={() => this.setState({ isToggleOn: !this.state.isToggleOn })}
          />
          {isToggleOn && <SideBar />}
        </Toggle>
      </div>
    )
  }
}
export default SideBarMobile

import { Component } from 'react'

export default class Toggle extends Component {
  state = { on: false }

  toggle = () => {
    this.setState({ on: !this.state.on })
  }

  render() {
    // const styles = {
    //   onlyShowOnMobile: {
    //     display: 'block',
    //     '@media screen and (min-width:64em)': {
    //       display: 'none',
    //     },
    //   },
    // }
    const { children } = this.props

    return children({
      on: this.state.on,
      toggle: this.toggle,
    })
  }
}

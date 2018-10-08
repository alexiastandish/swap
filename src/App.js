import React, { Component } from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './ducks/store'
import Nav from './components/Nav/Nav'
// import SideBar from './components/SideBar/SideBar'
// import { Link } from 'react-router-dom'
import './App.css'
// import axios from 'axios'

class App extends Component {
  // componentDidMount() {
  //   axios.get('/api/users').then(response => console.log('response', response))
  // }
  // constructor() {
  //   super()

  //   this.state = {
  //     users: [],
  //   }
  // }

  render() {
    return (
      // <Provider store={store}>
      //   <BrowserRouter>
      //     <div className="landing-view">
      //       <Nav />
      //       <Link to="/dash" />
      //     </div>
      //   </BrowserRouter>
      // </Provider>

      <div className="App">
        <Nav />
      </div>
    )
  }
}

export default App

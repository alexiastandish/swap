import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import App from './App'
import Dash from './views/Dash/Dash'
import Friends from './views/Friends/Friends'
// import AddItem from './views/AddItem/AddItem'
import Likes from './views/Likes/Likes'
import Profile from './views/Profile/Profile'
import Offers from './views/Offers/Offers'
// import Item from './views/Item/Item'
// import Login from './Login'
import Home from './Home'
import Item from './views/Item/Item'

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/dash" component={Dash} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/friends/:id" component={Friends} />
      <Route path="/likes/:id" component={Likes} />
      <Route path="/offers" component={Offers} />
      {/* <Route path="/additem" component={AddItem} /> */}
      <Route path="/item/:id" component={Item} />
      <Redirect to="/" />
    </Switch>
  )
}

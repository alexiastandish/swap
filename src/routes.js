import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dash from './views/Dash/Dash'
import Friends from './views/Friends/Friends'
import Likes from './views/Likes/Likes'
import Profile from './views/Profile/Profile'
import Offers from './views/Offers/Offers'
import Home from './Home'
import Item from './views/Item/Item'
import MyProfile from './views/Profile/MyProfile'
import Notifications from './views/Notifications/Notifications'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dash" component={Dash} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/myProfile/:id" component={MyProfile} />
      <Route path="/friends" component={Friends} />
      <Route path="/likes" component={Likes} />
      <Route path="/offers" component={Offers} />
      <Route path="/item/:id" component={Item} />
      <Route path="/notifications" component={Notifications} />
      <Redirect to="/" />
    </Switch>
  )
}

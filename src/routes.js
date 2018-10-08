import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dash from './views/Dash/Dash'
import Friends from './views/Friends/Friends'
import Likes from './views/Likes/Likes'
import Profile from './views/Profile/Profile'
import Offers from './views/Offers/Offers'

export default (
  <Switch>
    <Route path="/dash" component={Dash} />
    <Route path="/friends" component={Friends} />
    <Route path="/likes" component={Likes} />
    <Route path="/offers" component={Offers} />
    <Route path="/profile/:id" component={Profile} />
  </Switch>
)

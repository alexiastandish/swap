import React from 'react'
import Profile from './Profile'
import './MyProfile.scss'

export default function MyProfile(props) {
  return (
    <div className="current-user-profile">
      <Profile {...props} />
    </div>
  )
}

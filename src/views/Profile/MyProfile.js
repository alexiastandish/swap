import React from 'react'
import Profile from './Profile'
import './MyProfile.scss'

export default function MyProfile(props) {
  return (
    <div className="dash-container dash-space-around">
      <Profile {...props} />
    </div>
  )
}

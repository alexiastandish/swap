import React from 'react'
import Profile from './Profile'

export default function MyProfile(props) {
  console.log('props', props)
  return <Profile {...props} />
}

import React from 'react'
import './ErrorMessage.scss'
import MessageStyle from './MessageStyle'

const ErrorMessage = props => {
  return (
    <div className="ErrorMessage--container" style={{ zIndex: '90000' }}>
      <MessageStyle message={props.message} />
    </div>
  )
}
export default ErrorMessage

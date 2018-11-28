import styled, { keyframes } from 'styled-components'
import React from 'react'

const messageStyle = keyframes`
  0% {
    width: 0px;
    background: #424c58;
    height: 50px;
    padding: 10px;

  }
  100% {
    width: 400px;
    background: #424c58;
    height: 50px;
    padding: 10px;  
  }

`
const fadeIn = keyframes`
  0% {
    opacity: 0;
    color: #e5e5e5;

  }
  100% {
    opacity: 1;
    color: #e5e5e5;
 
  }
`
export const Style = styled.input`
  display: inline-block;
  border: none;
  border-radius: 50px 0px 0px 50px;
  position: relative;
  animation: 1s ${fadeIn} ease-out;
  animation-name: ${messageStyle};
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`

const MessageStyle = props => {
  return (
    <div className="MessageStyle--container">
      <Style placeholder={props.message} />
    </div>
  )
}

export default MessageStyle

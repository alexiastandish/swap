import { device } from '../size'
import styled, { keyframes } from 'styled-components'

const scaleUpDown = keyframes`

	from { opacity: 0; transform: scale(1.2); }

`

const AboutBox = styled.section`
  background: #2acbdc;
  height: 60vh;
  width: 35%;
  display: flex;
  margin: 0 auto;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -20px;
  box-shadow: 2px 6px 8px -2px rgba(0, 0, 0, 0.2);
  animation: ${scaleUpDown} 0.75s ease both;

  @media ${device.mobileS} {
    width: 80%;
  }

  @media ${device.mobileM} {
    width: 80%;
  }

  @media ${device.laptop} {
    width: 50%;
  }

  @media ${device.desktop} {
    max-width: 40%;
  }
`

export default AboutBox

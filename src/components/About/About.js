import React, { Component } from 'react'
import AboutBox from './AboutBox'
import './About.scss'
import { Link } from 'react-router-dom'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div
        className="about-container"
        style={{ left: '0', top: '0', width: '100vw', position: 'absolute' }}
      >
        <AboutBox>
          <section className="about-content">
            <h1>About</h1>
            <div className="about-text">
              <p>
                The idea for my application came to me when my friend and I decided to each clean
                out our closets and exchange things that we no longer use anymore. We each
                discovered things that we liked and found value in from the other person pile and we
                could do all of this without spending a dime. Swap makes this process much more
                functional and adds the convenience of being able to display all of your tradable
                items and see your friends tradable items all in one place.
                <br />
              </p>
              <div>
                <h3>Technologies:</h3>
                <div className="technologies">
                  <p>REACT | FIREBASE | REDUX | SASS | DOWNSHIFT | AUTH0 | REACT-MODALS</p>
                </div>
              </div>
              <p>
                <br />
                Use the authorization credentials below to sign in anonymously and explore the
                functionality of Swap without creating profile...
              </p>
            </div>
            <div className="anonymous-login">
              <h3>
                email: <span>swap.anonymously@gmail.com</span>
              </h3>
              <h3>
                password: <span>anonymous.2018</span>
              </h3>
            </div>

            <Link className="btn-home" to="/">
              GO BACK
            </Link>
          </section>
        </AboutBox>
      </div>
    )
  }
}
export default About

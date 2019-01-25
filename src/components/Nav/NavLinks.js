import React from 'react'
//import './.css';
import { Link } from 'react-router-dom'
import Media from 'react-media'

const NavLinks = () => {
  return (
    <Media query={{ minWidth: 487 }}>
      <div className="nav-container__links ">
        <Link className="primary-link" to="/notifications">
          Notifications
        </Link>
        <a className="primary-link" href={`${process.env.REACT_APP_URL}/logout`}>
          Logout
        </a>
      </div>
    </Media>
  )
}
export default NavLinks

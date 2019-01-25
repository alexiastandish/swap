import React from 'react'
//import './.css';
import { Link } from 'react-router-dom'

const NavLinks = () => {
  return (
    <div className="nav-container__links ">
      <Link className="primary-link" to="/notifications">
        Notifications
      </Link>
      <a className="primary-link" href={`${process.env.REACT_APP_URL}/logout`}>
        Logout
      </a>
    </div>
  )
}
export default NavLinks

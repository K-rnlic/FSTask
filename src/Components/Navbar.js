import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react'

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogOut = () => {
      localStorage.removeItem('token');
      navigate('/login');
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <picture>
                <source media="(min-width: 320px)" srcset="https://www.reliancenipponlife.com/image/RNLIC-logo.webp" type="image/webp"/>
                <img src="https://www.reliancenipponlife.com/image/RNLIC-logo.png" alt="Logo"/>
              </picture>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`} aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/FB"? "active" : ""}`} to="/FB">
                    FeedBack
                  </Link>
                </li>
              </ul>
              { !localStorage.getItem('token') ?
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="submit">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="submit">Sign Up</Link>
              </form> :
              <button type="button" className="btn btn-primary" onClick={handleLogOut}>Log Out</button>
              }
            </div>
          </div>
        </nav>
      </div>
    )
  }

export default Navbar

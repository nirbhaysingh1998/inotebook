import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = (props) => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/login");
  }
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">{props.title}</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={`nav-link ${location.path === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`nav-link ${location.path === "/about" ? "active" : ""}`} to="/about">About</NavLink>
                </li>


              </ul>
              {!localStorage.getItem('token') ? <form className="d-flex">
                <NavLink className="btn btn-primary mx-2" to="/login" role="button">Login</NavLink>
                <NavLink className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</NavLink>
              </form> : <button className="btn btn-primary" onClick={handleLogout} >Logout</button>}
            </div>
          </div>
        </nav>

      </div >
    </>
  )
}

export default Navbar

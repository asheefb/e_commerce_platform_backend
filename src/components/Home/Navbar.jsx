import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../User/Profile";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const style = {
    color: "white",
    backGroundColor: "baack",
    fontSize: "x-large",
  };

  const [isOnIconPage, setIsOnIconPage] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    console.log("clicked");
    setShowMenu(!showMenu);
  };

  const handleProfileClick=()=>{
    if(isOnIconPage){
      navigate('/');
    }else{
    navigate('/usermenu',{state:{user:localStorage.getItem('userData')}})
    }
    setIsOnIconPage(!isOnIconPage)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            E-Commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="What are you looking for"
                aria-label="Search"
              />

              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              <Link className="nav-link active" aria-current="page" to="view-cart">
                <FaShoppingCart style={style} className="m-2 icon" />
              </Link>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <FaUserCircle style={style} onClick={handleProfileClick} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

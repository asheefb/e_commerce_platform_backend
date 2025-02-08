import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ShowCart from "../Cart/ShowCart";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Data = location.state?.user || localStorage.getItem("userData");
  console.log(Data);
  console.log("object");
  console.log(Data.role);
  const userData = typeof Data === "string" ? JSON.parse(Data) : Data;

  const handleViewAllUsers = () => {
    navigate("/viewallusers");
  };

  const handleAddUser = () => {};

  const handleAddProduct = () => {
    navigate("/addproduct");
  };

  const handleViewAllProducts = () => {
    navigate("/productlist");
  };

  const handleProfile=()=>{
    navigate('/view-profile',{state:{user:localStorage.getItem("userData")}})
  }

  return (
    <>
      <div className="bgColor">
        <h2>Profile</h2>
        <div>
          {userData ? (
            userData.role === "ADMIN" || userData.role === "Admin" ? (
              <div className="container">
                <button className="m-2" onClick={handleViewAllUsers}>
                  View All Users
                </button>{" "}
                <br />
                <button className="m-2" onClick={handleAddProduct}>
                  Add New Product
                </button>{" "}
                <br />
                <button className="m-2" onClick={handleViewAllProducts}>
                  View All Product
                  <h6>you Can Update and Delete here</h6>
                </button>{" "}
                <br />
              </div>
            ) : (
              <div>
                <button onClick={handleProfile}>View My Profile</button>
              </div>
            )
          ) : (
            <div>
              <p>No User Found. Please Register or Login.</p>
              <Link to="/register">Register</Link> <br />
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;

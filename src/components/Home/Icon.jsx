import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "../User/Profile";

const Icon = () => {
  const [user, setUser] = useState(() => !!localStorage.getItem("authToken"));
  const userData=JSON.parse(localStorage.getItem("userData"));;
  const navigate = useNavigate();
  console.log(userData+" Ico")
  console.log(user+" Icon")

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('userData')
    setUser(false);
    navigate("/login");
  };
  return (
    <div className="bgColor">
      {!user ? (
        <div className="container mt-4 m-1 text-center">
          <button className="m-1" onClick={handleLogin}>
            Login
          </button>
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div className="container mt-4 m-1 text-center">
          <Profile userData={userData}/>
          <button onClick={handleLogout}>LogOut</button>
        </div>
      )}
    </div>
  );
};

export default Icon;

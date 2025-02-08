import axios from "axios";
import React, { useState } from "react";
import { register } from "../../service/UserApi";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !(
        userData.userId &&
        userData.userName &&
        userData.email &&
        userData.password
      )
    ) {
      return setError("Please Enter All Fields");
    }

    if (userData.phoneNumber.length != 10) {
      return setError("Enter valid Phone Number");
    }

    if (userData.password.length < 8) {
      setError("Password must contain More than 8");
      return;
    }

    if (userData.password !== confirmPassword) {
      return setError("Password does Not Match");
    }

    try {
      const userData2 = await register(userData);
      console.log(userData2.data);
      localStorage.setItem("auth token", userData2.data.token);
      localStorage.setItem("userData", JSON.stringify(userData2.data));
      navigate("/profile", { state: { user: userData2.data } });
    } catch (error) {
      console.error("Error While Register", error);
      setError("Registration Failed i");
    }
  };

  return (
    <>
      <div className="bgColor">
        <h3 className="card-title text-center">
          <strong>Sign up for Ecommerce</strong>
        </h3>
        <div className="container mt-4 d-flex card shadow-lg p-4 border rounded ">
          <form>
            <input
              className="form-control rounded-pill"
              type="number"
              placeholder="Enter user Id"
              name="userId"
              value={userData.userId}
              onChange={handleChange}
              required
            />{" "}
            <br />
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter User Name"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={userData.email}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="number"
              className="form-control rounded-pill"
              name="phoneNumber"
              placeholder="Enter Phone"
              id="phone"
              value={userData.phoneNumber}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              id="pass"
              placeholder="Enter Password"
              value={userData.password}
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="password"
              className="form-control rounded-pill"
              name="Confirm password"
              id="con_pass"
              placeholder="Confim Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />{" "}
            <br />
            {error && <div className="text-danger">{error}</div>}
            {/* <input type="text" name="cart" id="cart" value={userData.cart} hidden onChange={handleChange} /> */}
            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={handleRegister}
            >
              Create a Account
            </button>
            <p className="text-center mt-3">
              Already Have Account?
              <Link to="/login" className="nav-link active" aria-current="page">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

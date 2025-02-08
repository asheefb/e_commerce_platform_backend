import React, { useState } from "react";
import { loginWithEmail, loginWithPhone } from "../../service/UserApi";
import App from "../../App";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = ({ onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("email");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    let userData;
    try {
      if (loginMethod === "email") {
        userData = await loginWithEmail(email, password);
        console.log(userData.data);
      } else if (loginMethod === "phoneNumber") {
        userData = await loginWithPhone(phoneNumber, password);
        console.log(userData.data);
      }if(userData.statusCode===404){
        setError(userData.data)
      }
      console.log(from + " login");
      localStorage.setItem("authToken", userData.data.token);
      localStorage.setItem("userData", JSON.stringify(userData.data));
      navigate(from, { state: { user: userData.data }, replace: true });
    } catch (error) {
      console.error("Error While Login", error);
      setError("Login Failed");
    }
  };

  return (
    <>
      <div className="bgColor">
        <h3 className="card-title text-center">
          <strong>Login</strong>
        </h3>
        <div className="container">
          <label>
            <input
              type="radio"
              value={email}
              checked={loginMethod === "email"}
              onChange={() => {
                setLoginMethod("email");
              }}
            />
            Login With Email
          </label>
          <label>
            <input
              type="radio"
              value={phoneNumber}
              checked={loginMethod === "phoneNumber"}
              onChange={() => {
                setLoginMethod("phoneNumber");
              }}
            />
            Login With Phone
          </label>
        </div>
        <div className="container mt-4 d-flex card shadow-lg p-4 border rounded">
          {loginMethod === "email" ? (
            <div>
              <input
                type="email"
                className="form-control rounded-pill"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
            </div>
          ) : (
            <div>
              <input
                type="number"
                className="form-control rounded-pill"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }} 
              /><br/>
            </div>
          )}

          <div>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />{" "}
            <br />
            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={handleLogin}
            >
              Login
            </button>{" "}
            <br />
            <p className="text-center mt-2">
              <Link className="nav-link active" to="/register">
                Don't have Account?Create new Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

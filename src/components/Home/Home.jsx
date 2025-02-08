import React from "react";
import Navbar from "./Navbar";
import ListProduct from "../Product/ListProduct";

const Home = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  return (
    <div>
      {/* <h1>Welcome To Home Page</h1> */}
      <ListProduct data={user}/>
    </div>
  );
};

export default Home;

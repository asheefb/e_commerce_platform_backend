import { useState } from "react";
import "./App.css";
import Navbar from "./components/Home/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Profile from "./components/User/Profile";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import AddProduct from "./components/Product/AddProduct";
import ListProduct from "./components/Product/ListProduct";
import Update from "./components/Product/Update";
import Delete from "./components/Product/Delete";

import Messge from "./components/Messge";
import Icon from "./components/Home/Icon";
import ViewAllUsers from "./components/User/ViewAllUsers";
import ViewProfile from "./components/User/ViewProfile";
import ShowCart from "./components/Cart/ShowCart";
import AddToCart from "./components/Cart/AddToCart";

function App() {
  const login = (userData) => {
    setUser(userData);
    navigate("/icon"); // Navigate to Icon page after login
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <BrowserRouter>
      <div className="bgColor">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/usermenu" element={<Icon />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/viewallusers" element={<ViewAllUsers />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/view-profile" element={<ViewProfile />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/add-to-cart" element={<AddToCart />}></Route>
          <Route path="/productlist" element={<ListProduct />}></Route>
          <Route path="/message" element={<Messge />}></Route>
          <Route path="/update" element={<Update />}></Route>
          <Route path="/delete" element={<Delete />}></Route>
          <Route path="/view-cart" element={<ShowCart />}></Route>
        </Routes>
        {/* <AddProduct/> */}
        {/* <Update /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

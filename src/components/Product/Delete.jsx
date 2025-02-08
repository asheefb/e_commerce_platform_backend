import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/ProductApi";

const Delete = () => {
  const location = useLocation();
  const productId = location.state?.Id;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await deleteProduct(productId);
      console.log(productId + " Delete");
      console.log(data);
      navigate("/message", {
        state: {
          message: "Deleted Succesufully",
          button: "View List",
          path: "/productlist",
        },
      });
    } catch (error) {
      console.error("Login failed with error", error);
    }
  };

  const handleClose = (event) => {
    navigate("/productlist")
  };
  return (
    <div className="container bgColor">
      <h4>Are you Sure</h4>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={handleClose}>No</button>
    </div>
  );
};

export default Delete;

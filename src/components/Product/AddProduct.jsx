import React, { useState } from "react";
import { addProduct } from "../../api/ProductApi";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [error, setError] = useState("");
  const navigate =useNavigate();
  const [productData, setProductData] = useState({
    productId: "",
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: {
      categoryName: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      category: {
        ...prevData.category,
        [name]: value,
      },
    }));
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const productData2 = await addProduct(productData);
      console.log(productData2);
      navigate("/productlist",{ state: { product: productData2.data } })
    } catch (error) {
      console.error("login failed With error", error);
    }
  };

  return (
    <div className="bgColor">
      <form action="" className="container mt-4 d-flex card shadow-lg p-4 border rounded">
        <input
          type="number"
          className="form-control rounded-pill"
          name="productId"
          value={productData.productId}
          id="productId"
          placeholder="Enter Product Id"
          required
          onChange={handleChange}
        />{" "}
        <br />
        <input

          type="text"
          className="form-control rounded-pill"
          name="productName"
          value={productData.productName}
          id="productName"
          placeholder="Enter Product Name"
          required
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="text"
          className="form-control rounded-pill"
          name="description"
          value={productData.description}
          id="description"
          placeholder="Enter description"
          required
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="number"
          className="form-control rounded-pill"
          name="price"
          value={productData.price}
          id="price"
          placeholder="Enter Price"
          required
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="number"
          className="form-control rounded-pill"
          name="stock"
          value={productData.stock}
          id="stock"
          placeholder="Enter Stock"
          required
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="text"
          className="form-control rounded-pill"
          name="categoryName"
          value={productData.category.categoryName}
          id="categoryName"
          placeholder="Enter category Name"
          required
          onChange={handleCategoryChange}
        />{" "}
        <br />
        <button className="btn btn-primary w-100" onClick={handleAdd}>
          Add
        </button>
        {error && <div className="text-danger">{error}</div>}
      </form>
    </div>
  );
};

export default AddProduct;

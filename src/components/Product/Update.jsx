import React, { useState } from "react";
import { addProduct, findById } from "../../api/ProductApi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Update = () => {
  const location = useLocation();
  const product = location.state?.p;
  const [error, setError] = useState("");
  const navigate=useNavigate();
  // console.log(product.data)
  console.log("object");
  console.log(product);
  const [productData, setProductData] = useState({
    productId: product.productId,
    productName: product.productName,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: {
      categoryName: product.category.categoryName,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProduct) => ({
      ...prevProduct,
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const update = await addProduct(productData);
      console.log(update.data);
      navigate("/message", { state: { product: productData.data ,message: "Updated Succesufully" ,button:"View List",path:"/productlist"} });
    } catch (error) {
      console.error("Login failed with error", error);
    }
  };

  return (
    <div className="bgColor">
      <form action="">
        <input
          type="number"
          name="productId"
          value={product.productId}
          id="productId"
          placeholder="Enter Product Id"
          readOnly
        />{" "}
        <br />
        <input
          type="text"
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
          name="categoryName"
          value={productData.category.categoryName}
          id="categoryName"
          placeholder="Enter category Name"
          required
          onChange={handleCategoryChange}
        />{" "}
        <br />
        <button className="btn btn-primary w-100" onClick={handleUpdate}>
          Update
        </button>
        {error && <div className="text-danger">{error}</div>}
      </form>
    </div>
  );
};

export default Update;

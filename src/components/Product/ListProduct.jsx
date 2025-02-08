import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { findAllProduct } from "../../api/ProductApi";

const ListProduct = () => {
  const location = useLocation();
  const productData = location.state?.product;
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  console.log(user + " from");

  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setError("");
      setLoading(true);
      try {
        const productList = await findAllProduct();
        if (productList && productList.length > 0) {
          setProducts(productList); // Update the state with product data
        } else {
          setError("No products available.");
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Automatically fetch products on component mount
  }, []);

  const handleRefresh = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const productList = await findAllProduct();
      if (productList && productList.length > 0) {
        setProducts(productList); // Update the state with product data
      } else {
        setError("No products available.");
      }
      console.log(productList + " 2");
    } catch (error) {
      console.error("Login Filed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (product) => {
    navigate("/update", { state: { p: product } });
  };

  const deleteProduct = (productId) => {
    console.log(productId + " Hjdf");
    navigate("/delete", { state: { Id: productId } });
  };

  const handleAddCart = (productId) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      navigate("/add-to-cart", { state: { id: productId } });
    }
  };

  return (
    <div className="bgColor">
      <div className="container text-center">
        <h3>
          Welcome to Product List <BiRefresh onClick={handleRefresh} />
        </h3>
        {Loading ? (
          <p>
            <strong>"Products Loading..."</strong>
          </p>
        ) : (
          <div>
            <table className="table table-stripped">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock Id</th>
                  <th>Category</th>
                  <th>Images</th>
                  {user && (user.role === "ADMIN" || "Admin") ? (
                    <div>
                      <th>Update</th>
                      <th>Delete</th>
                    </div>
                  ) : (
                    <div>
                      <th>Add To cart</th>
                    </div>
                  )}
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.category.categoryName}</td>
                      <td>
                        <img src={product.imageUrl} alt={product.productName} className="img"/>
                      </td>
                      <td>
                        {user !== null && user.role !== "CUSTOMER" ? (
                          <>
                            <button
                              className="m-2 btn btn-primary"
                              onClick={() => {
                                handleUpdate(product);
                              }}
                              product={product}
                            >
                              Update
                            </button>
                            <button
                              className="m-2 btn btn-danger"
                              onClick={() => {
                                deleteProduct(product.productId);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleAddCart(product.productId);
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Please Refresh the page</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;

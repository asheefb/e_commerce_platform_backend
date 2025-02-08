import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCartById } from "../../service/CartService";

const ShowCart = () => {
  const [showCart, setShowCart] = useState(null); // Initialize with null to represent no data initially

  const userData = localStorage.getItem("userData");
  const user = typeof userData === "string" ? JSON.parse(userData) : userData;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user !== null && user.cart) {
          const cart = await getCartById(user.cart.cartId);
          setShowCart(cart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="bgColor">
      <h3>Your Cart</h3>
      {showCart ? (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            {/* <h4>Products:</h4> */}
            <tbody>
              {showCart.data?.products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td><img src={product.imageUrl} alt={product.productName} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <strong>Total:</strong> {showCart.data?.total}
          </div>
        </div>
      ) : (
        <h4 className="text-center">
          No User Found! Please <Link to={"/login"}> Login </Link> or{" "}
          <Link to={"/register"}> Register</Link>
        </h4>
      )}
    </div>
  );
};

export default ShowCart;

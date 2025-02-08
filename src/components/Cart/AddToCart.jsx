import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../service/CartService";

const AddToCart = () => {
  const location = useLocation();
  const productId = location.state.id;
  console.log(productId);

  const [cart, setcart] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData");
  const user = typeof userData === "string" ? JSON.parse(userData) : userData;

  useEffect(() => {
    const AddToCart = async () => {
      if (user && productId) {
        try {
          const cartId = user.cart.cartId;
          const updatedCart = await addToCart(cartId, productId);
          setcart(updatedCart);
          navigate("/message", {
            state: { message: "Product Added Sucessufully", button: "Back" },
          });
        } catch (error) {
          console.error("Error Adding to cart");
          setError("Failed");
        }
      }
    };
    AddToCart();
  }, []);
  return <div></div>;
};

export default AddToCart;

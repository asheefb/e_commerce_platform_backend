import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Messge = () => {
    const location=useLocation();
    const productData=location.state?.product;
    const message=location.state?.message;
    const button=location.state?.button;
    // const path="-1";
    const navigate=useNavigate();

    const handleButton=()=>{
        console.log(message);
        console.log(button);
        // console.log(path);
        navigate('/productlist')
    }

  return (
    <div className="bgColor">
      {/* {productData ? (
        <div>
          <p>
            <strong>Product Added Sussufully</strong>
          </p>
        </div>
      ) : (
        <div>
          <h3>Please Add Product</h3>
          <Link to="/addproduct">Add</Link>
        </div>
      )} */}
<p className="text-center"><strong>{message}</strong></p>
<button onClick={handleButton}>{button}</button>


    </div>
  );
};

export default Messge;

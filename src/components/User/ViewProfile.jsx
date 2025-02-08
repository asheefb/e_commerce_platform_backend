import React from "react";
import { useLocation } from "react-router-dom";

const ViewProfile = () => {
  const location = useLocation();
  const userData = location.state?.user||localStorage.getItem('userData');
  const user=typeof userData==='string'?JSON.parse(userData):userData
  return <div className="bgColor">{user !==null? <div>
    <ul>
       <li>{user.userId}</li> 
       <li>{user.userName}</li>
       <li>{user.email}</li>
       <li>{user.phoneNumber}</li>
       <button className="m-2">
        update
        </button>
        <button>Delete</button>
    </ul>
  </div> : <div></div>}</div>;
};

export default ViewProfile;

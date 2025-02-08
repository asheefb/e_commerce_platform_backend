import React, { useEffect, useState } from "react";
import { findAllUsers } from "../../service/UserApi";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userData = await findAllUsers();
        if (
          userData &&
          Array.isArray(userData.data) &&
          userData.data.length > 0
        ) {
          setUsers(userData.data);
        } else {
          setError("No users found.");
        }
      } catch (err) {
        setError("Error fetching users.");
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="container bgColor">
      <h1 className="text-center">All Users</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user.role === "CUSTOMER" ? (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
              </tr>
            ) : (
              <br />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllUsers;

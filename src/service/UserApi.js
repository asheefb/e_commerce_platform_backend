import axios from "axios";
import Profile from "../components/User/Profile";

const API_URL = "http://localhost:8080/api/users";

export const loginWithEmail = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/email`, null, {
      params: { email: email, password: password },
    });
    if (response.status === 200) {
      console.log("Login Success", response.data);
      return response.data; // Return the user data from the response
    } else {
      // Handle case where login does not return 200 (like 302 or other)
      console.log("hi");
      console.error("Login failed with status code", response.status);
      throw new Error("Login failed");
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const loginWithPhone = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/phone`, null, {
      params: { phoneNumber: phoneNumber, password: password },
    });
    if (response.status === 200) {
      console.log("Login Success", response.data);
      //   <Profile userData={response.data}/>
      return response.data; // Return the user data from the response
    } else {
      // Handle case where login does not return 200 (like 302 or other)
      console.error("Login failed with status code", response.status);
      throw new Error("Login failed");
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message + " " + "hi");
    }
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.status === 201) {
      console.log("Login Success", response.data);
      return response.data; // Return the user data from the response
    } else {
      // Handle case where login does not return 200 (like 302 or other)
      console.error("Login failed with status code", response.status);
      throw new Error("Login failed");
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const findAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/find-all`);
    if (response.status === 200) {
      console.log("Login success", response.data);
      return response.data;
    } else {
      console.error("Login Failed with status code", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/add-product`, productData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status == 201) {
      console.log("Login Success", response.data);
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

export const findAllProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/find-all`);
    if (response.status == 200) {
      console.log("Login Sucecc", response.data.data);
      return response.data.data;
    } else {
      console.error("Login Failed With status Code", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const findById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/find-by-id`, {
      params: {
        productId: productId,
      },
    });
    if (response.status) {
      console.log("Login Success", response.data);
      return response.data;
    } else {
      console.error("Login Failed with Status code", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-product`,  {
      params: {
        productId: productId,
      },
    });
    if (response.status == 200) {
      console.log("Deleted Success", response.data);
      return response.data;
    } else {
      console.error("Deletion Failed with code", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

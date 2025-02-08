import axios from 'axios';

const API_URL="http://localhost:8080/api/cart";

export const addToCart=async(cartId,productId)=>{
    try {
        const response=await axios.post(`${API_URL}/add-to-cart`,null,{params:{
            cartId:cartId,productId:productId
        }})
        if(response.status==200){
            console.log('Login Success',response.data);
            return response.data;
        }else{
            console.error('Login Failed With Status Code',response.status);
            throw new Error("Login failed");
            
        }
    } catch (error) {
        if(error.response)
            console.error(error.response.data);
        else{
            console.error(error.message);
        }
    }
}

export const removeFromCart=async(cartId,productId)=>{
    try {
        const response=await axios.delete(`${API_URL}/remove-from-cart`,null,{params:{cartId:cartId,productId:productId}})
        if(response.status==200){
            console.log('Login Success',response.data);
            return response.data;
        }else{
            console.error('Login Failed With status Code',response.status);
            throw new Error("Login Failed");
        }
    } catch (error) {
        if(error.response){
            console.error(error.response.data);
        }else{
            console.error(error.message);
        }
    }
}

export const getCartById=async(cartId)=>{
    try {
        const response=await axios.get(`${API_URL}/get/carts`,{params:{cartId:cartId}})
        if(response.status==200){
            console.log('Login Success',response.data);
            return response.data
        }else{
            console.error('Login Failed With status code',response.status);
            throw new Error("Login fialed");
        }
    } catch (error) {
       if(error.response){
        console.error(error.response.data);
       }else{
        console.error(error.message);
       }

    }
}

export const createCart=async(cartData)=>{
    try {
        const response=await axios.post(`${API_URL}/create/cart`,cartData,{method:"POST",headers:{
            "Content-Type":"application/json","Accept":"application/json"
        }})
        if(response.status==201){
            console.log('Login Success',response.data)
            return response.data;
        }else{
            console.error('Login failed With status Code',response.status);
            throw new Error("Login Failed");
        }

    } catch (error) {
        if(error.response)
            console.error(error.response.data);
        else{
            console.error(error.message);
        }
    }
}

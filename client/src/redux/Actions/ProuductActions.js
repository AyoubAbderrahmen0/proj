import axios from "axios"
import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT_BY_ID, GET_PRODUCTS, LOAD_PRODUCT, UPDATE_PRODUCT } from "../ActionTypes/ProductActionsTypes";



export const addProduct =(newProduct)=>async(dispatch)=>{   //dispatch for 
    dispatch({type:LOAD_PRODUCT})
    try{
        const response = await axios.post("http://localhost:8000/api/product/addProduct",newProduct);
        dispatch({
            type:ADD_PRODUCT,
            payload:response.data
        })
    }catch(error){
        dispatch({
            type:ERROR_PRODUCT,
            payload:error
        })
    }
}

export const updateProduct=(id,newPrice)=>async(dispatch)=>{
    dispatch({type:LOAD_PRODUCT});
    try{
        const response = await axios.put(`http://localhost:8000/api/product/updateProduct/${id}`,newPrice);
        dispatch({
            type:UPDATE_PRODUCT,
            payload:response.data
        })
    }catch(error){
        dispatch({
            type:ERROR_PRODUCT,
            payload:error
        })
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    dispatch({type:LOAD_PRODUCT});
    try{
        const response = await axios.delete(`http://localhost:8000/api/product/deleteProduct/${id}`);
        dispatch({
            type:DELETE_PRODUCT,
            payload:response.data
        })
        getProducts()
    }catch(error){
        dispatch({
            type:ERROR_PRODUCT,
            payload:error
        })
    }
}

export const getProductById=(id)=>async(dispatch)=>{
    dispatch({type:LOAD_PRODUCT});
    try{
        const response = await axios.get(`http://localhost:8000/api/product/getProduct/${id}`);
        dispatch({
            type:GET_PRODUCT_BY_ID,
            payload:response.data
        })
    }catch(error){
        dispatch({
            type:ERROR_PRODUCT,
            payload:error
        })
    }
}

export const getProducts=(id)=>async(dispatch)=>{
    dispatch({type:LOAD_PRODUCT});
    try{
        const response = await axios.get("http://localhost:8000/api/product/getProducts");
        dispatch({
            type:GET_PRODUCTS,
            payload:response.data
        })
    }catch(error){
        dispatch({
            type:ERROR_PRODUCT,
            payload:error
        })
    }
}
import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT_BY_ID, GET_PRODUCTS, LOAD_PRODUCT, UPDATE_PRODUCT } from "../ActionTypes/ProductActionsTypes";



//initial State
const initialState={
    load:false,
    products:[],
    currentProduct:null,
    error:null
};

//pure function
const ProductReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case LOAD_PRODUCT:
            return {...state,load:true}
        case ERROR_PRODUCT:
            return {...state,error:payload,load:false}
        case ADD_PRODUCT:
            return {...state,products:[...state.products,payload.product]}
        case UPDATE_PRODUCT:
            return {...state,load:false,products:payload.products}
        case DELETE_PRODUCT:
            return {...state,load:false,products:payload.products}
        case GET_PRODUCT_BY_ID:
            return {...state,currentProduct:payload.product,load:false}
        case GET_PRODUCTS:
            return {...state,products:payload.products,load:false}
        default:
            return state
    }
}

export default ProductReducer
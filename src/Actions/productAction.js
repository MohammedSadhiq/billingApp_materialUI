import axios from 'axios';

const url = 'https://dct-billing-app.herokuapp.com/api/products';

const token = localStorage.getItem('token');

const config = {
    headers:{
        Authorization : `Bearer ${token}`
    }
}

export const setProducts = (data)=>{

    return {
      type : 'SET_PRODUCTS',
      payload : data   
    }
}

export const addProduct = (data) =>{
    return {
        type : 'ADD_PRODUCT',
        payload : data
    }
}

export const updateProduct = (data) =>{
    return {
        type : 'UPDATE_PRODUCT',
        payload : data
    }
}

export const deleteProduct = (data) =>{
    return{
        type : 'DELETE_PRODUCT',
        payload : data
    }
}

export const asynGetProducts =()=>{
    return(dispatch)=>{
        axios.get(url,config).then(response=>{
            const data = response.data;
            dispatch(setProducts(data))
        }).catch(err=>alert(err.message))
    }
}

export const asyncAddProducts = (data,reset)=>{
    return(dispatch)=>{
        axios.post(url,data,config).then(response=>{
            const data = response.data;
            dispatch(addProduct(data))
            reset()
        }).catch(err=>alert(err.message))
    }
}

export const asynUpdateProducts = (id,data,reset) =>{
    return(dispatch)=>{
        axios.put(`${url}/${id}`,config).then(response=>{
            const data = response.data;
            dispatch(updateProduct(data));
            reset()
        }).catch(err=>alert(err.message))
    }
}

export const asyncDeleteProducts = (id) =>{
    return(dispatch)=>{
        axios.delete(`${url}/${id}`,config).then(response=>{
            const data = response.data;
            dispatch(deleteProduct(data))

        }).catch(err=>alert(err.message))     
    }
}

export const asyncProductDetail = (id, stateChange) =>{
    return(dispatch)=>{
        axios.get(`${url}/${id}`,config).then(response=>{
            const data = response.data;
            stateChange(data);

        }).catch(err=>alert(err.message))
    }
}
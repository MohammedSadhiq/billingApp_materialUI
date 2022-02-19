import axios from 'axios';

const url = 'https://dct-billing-app.herokuapp.com/api/bills';

export const setBills = (data)=>{
 return   {
    type : 'SET_BILLS',
    payload : data.reverse()
}
}

export const addBills = (data)=>{
    return {
        type : 'ADD_BILL',
        payload : data
    }
}

export const deleteBills = (data) =>{
    return {
        type : 'DELETE_BILL',
        payload : data
    }
}

export const asyncGetBills =()=>{

    return(dispatch) =>{
        const token = localStorage.getItem('token');
        const config = {
            header:{
                Authorization : `Bearer ${token}`
            }
        }
        axios.get(url,config).then(response=>{
            const data = response.data;
            dispatch(setBills(data));
        }).catch(err=>{
            alert(err.message)
        })
    }
}

export const asyncAddBill =(data,history) =>{
    return(dispatch)=>{
        const token = localStorage.getItem('token');
        const config ={
            header:{
                Authorization:`Bearer ${token}`
            }
        }

        axios.post(url,data,config).then(response =>{
            const data = response.data;
            dispatch(addBills(data));
            history.push(`/bills/${data._id}`)
        }).catch(err=>alert(err.message))
    }
}

export const asyncDeleteBill =(id)=>{
    return(dispatch)=>{
        const token = localStorage.getItem('token');
        const config = {

            headers:{Authorization : `Bearer ${token}`}
        }

        axios.delete(`${url}/${id}`,config).then(response => {
            const data = response.data;
            dispatch(deleteBills(data))
        }).catch(err=>alert(err.message))
    }
}

export const asyncGetBillDetails = (id, handleChange) =>{
    return(dispatch)=>{
        const token = localStorage.getItem('token');
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }

        axios.get(`${url}/${id}`, config).then(response =>{
            const data = response.data;
            handleChange(data);
        }).catch(err=>alert(err.message))
    }
}
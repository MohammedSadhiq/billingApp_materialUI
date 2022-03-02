import axios from 'axios';

const url = 'https://dct-billing-app.herokuapp.com/api/users/account'

const token = localStorage.getItem('token');

const config = {
    headers:{
        Authorization : `Bearer ${token}`
    }
}

export const setUser = (data)=>{
    return{
        type : 'SET_USER',
        payload : data
    }
}


export const asyncGetUser = ()=>{

  console.log('config in user',config)

    return (dispatch)=>{
        axios.get(url,config).then(response=>{
            const data = response.data;
            dispatch(setUser(data))
        }).catch(err=>alert(err.message))
    }
}
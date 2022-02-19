import axios from 'axios';


export const setLogin =()=>{
    return {
        type : 'SET_LOGIN',
        payload: true
    }
}

export const setLogout = () =>{
    return {
        type :'SET_LOGOUT',
        payload : false
    }
}

export const ayncLogin = (data,history,notify)=>{
    return (dispatch)=>{
        const url = 'https://dct-billing-app.herokuapp.com/api/users/login';
        axios.post(url,data).then(response=>{
            const data = response.data;
            if (data.token ){
                localStorage.setItem('token',data.token);
                dispatch(setLogin());
                history.push('/dashboard')
            }
            else if (data.errors){
                const notifyErrors ={ error: true, errorMessage : data.errors }
                notify(notifyErrors)
            }
        }).catch(err =>{
            alert(`${err.message}-${err.statusCode}`)
        })
    }
}
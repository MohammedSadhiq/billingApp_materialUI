import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../Actions/loginAction';
import Appbar from './Appbar';
import Drawer from './Drawer';

function Navbar(props) {

    const isLoggedIn = useSelector(state=>state.login)
    const dispatch = useDispatch();

    useEffect(()=>{
       if(localStorage.getItem('token')){
           dispatch(setLogin())
       }
    },[dispatch,props.history,isLoggedIn])

  return (
    <div>
        {
            isLoggedIn ? (<Drawer/>):(<Appbar/>)
        }
    </div>
  )
}

export default Navbar
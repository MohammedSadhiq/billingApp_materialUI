import React, { useEffect } from 'react';
import {Route,withRouter,Redirect,Switch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../Actions/loginAction';
import Appbar from './Appbar';
import Drawer from './Drawer';
import HomePage from '../HomePage/HomePage';
import LoginRegisterPage from '../HomePage/LoginRegisterPage';
import PrivateRoute from './PrivateRoute'

import ProductPage from '../ProductPage/ProductPage';

function Navbar(props) {

    const isLoggedIn = useSelector(state=>state.login);
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
       
        <Route path='/' 
        render = {(props)=>{return isLoggedIn ?   <Redirect to='/dashboard' /> : <HomePage/>}}
         exact={true}/>
        <Route path ='/faq'/>
        <Route path ='/login-or-register' 
        render = {(props)=>{return isLoggedIn ?   <Redirect to='/user' /> : <LoginRegisterPage {...props}/>}}
        />

      
        <PrivateRoute path='/products' component={ProductPage} exact={true} />
        
    </div>
  )
}

export default withRouter(Navbar)
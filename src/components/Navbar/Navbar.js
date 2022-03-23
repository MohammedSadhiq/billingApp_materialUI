import React, { useEffect } from 'react';
import {Route,withRouter,Redirect,Switch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../Actions/loginAction';
import Appbar from './Appbar';
import Drawer from './Drawer';
import HomePage from '../HomePage/HomePage';
import LoginRegisterPage from '../HomePage/LoginRegisterPage';
import PrivateRoute from './PrivateRoute'
import BillsPage from '../BillsPage/BillsPage';
import BillView from '../BillsPage/viewBill/BillView';
import AddBill from '../BillsPage/generateBill/AddBill';
import UserPage from '../userPage/UserPage';

import ProductPage from '../ProductPage/ProductPage';
import CustomerPage from '../customerPage/CustomerPage';
import ViewCustomer from '../customerPage/ViewCustomer/ViewCustomer';
import Dashboard from '../Dashboard/Dashboard';

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
       
       <PrivateRoute path='/bills' component={BillsPage} exact={true} />
       <PrivateRoute path='/bills/:id' component={BillView} exact={true}/>
       <PrivateRoute path='/addBill' component={AddBill} exact={true} />


      
        <PrivateRoute path='/products' component={ProductPage} exact={true} />

        <PrivateRoute path='/customers' component = {CustomerPage} exact={true} />
        <PrivateRoute path='/customers/:id' component={ViewCustomer} exact={true} />
        
        <PrivateRoute path='/user' component={UserPage} exact={true}/>
        <PrivateRoute path='/dashboard' component ={Dashboard} exact={true} />
    </div>
  )
}

export default withRouter(Navbar)
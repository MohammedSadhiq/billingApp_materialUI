import React,{useCallback, useEffect, useState} from 'react';
import {Container, IconButton,makeStyles} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import CustomerStats from './CustomerStats';
import CustomerOrder from './CustomerOrder';


const useStyle = makeStyles({
    container:{
        width:'90vw',
        padding: '2vh 1vw'
    }
})

function ViewCustomer(props) {

   const classes = useStyle();
   const bills = useSelector(state=>state.bills);
   const [customerBills,setCustomerBills] = useState([])   
    const id = props.match.params.id;

    console.log('id value in view customer',id)

    const getBills = useCallback((id)=>{
       
        const custBills = bills.filter(bill=>bill.customer === id)
        handleCustomerBills(custBills)
    },[bills])

    useEffect(()=>{
        getBills(id)
    },[getBills,id])

    function handleCustomerBills(data){
        setCustomerBills(data)
    }

  return (
    <Container>
        <Link to='/customers'>
            <IconButton>
                <ArrowBackIcon/>
            </IconButton>
        </Link>
        <CustomerStats id={props.match.params.id} customerBills={customerBills} />
        <CustomerOrder customerBills={customerBills}/>
    </Container>
  )
}


export default ViewCustomer
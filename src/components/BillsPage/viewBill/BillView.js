import { Box, Container, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetBillDetails } from '../../../Actions/billsAction';
import BillDetail from './BillDetail';
import BillItemTable from './BillItemTable';
import PrintBill from './PrintBill';


const useStyle = makeStyles({
    container:{
        width:'50vw',
        padding:'2vh 1vw'
    },
    viewBtn:{
        textDecoration:'none'
    }
})

function BillView(props) {
    
    const [billDetails,setBillDetails] = useState({});
    const [ customerDetails,setCustomerDetails] = useState({});
    const classes = useStyle();
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const customers = useSelector(state=>state.customer);

    console.log('params',props.match.params)

    const getCustomerDetail = useCallback((id)=>{
        
        console.log('id in getCustomer Details',id)
        console.log('get customer detail running',customers);
        const customer = customers.find(cust=>cust._id === id);
        console.log('getting details from getCustomer func', customer)
        if(customer){
            setCustomerDetails(customer);
        }
        console.log('bill details in get customer func', billDetails);
        console.log('customer details in getCustomer', customerDetails)
    },[customers])   

    const handleBillDetails = useCallback((data)=>{
        
        console.log('handle bill running',data);
        setBillDetails(data);
        if(data.customer){
            getCustomerDetail(data.customer)
        }
        else if (!data.customer){
            alert('Customer details not available for the given bill')
        }
       
        console.log('id passed to get Customer', data.customer)
    }, [getCustomerDetail])
    
    useEffect(()=>{
       
        console.log('useEffect running')
        dispatch(asyncGetBillDetails(id,handleBillDetails))
    },[id,dispatch,handleBillDetails])

    console.log('bill details', billDetails);
    console.log('customer Details',{});
   
  return (
    <Container className={classes.container}> 
        <Box display='flex' flexDirection='row' justifyContent='space-between'> 
            <Tooltip title='Go to Bills Page'>
                <Link to='/bills'>
                    <IconButton>
                        <ArrowBackIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
           {    
               (Object.keys(billDetails)?.length > 0 && Object.keys(customerDetails)?.length > 0) &&(
                   <PrintBill
                     id ={id}
                     bill={billDetails}
                     customer={customerDetails}
                     items={billDetails.lineItems}
                   />
               )
           }
           </Box>
           <Typography variant='h5' align='center'>Bill Invoice</Typography>
        {
            (Object.keys(billDetails)?.length > 0 && Object.keys(customerDetails)?.length > 0) && (
                <>
                    <BillDetail 
                        id={id}
                        billdetail={billDetails}
                        customerDetails = {customerDetails}
                    />
                    <BillItemTable items={billDetails.lineItems} total={billDetails.total}/>
                </>
            )
        }
    </Container>
  )
}

export default BillView
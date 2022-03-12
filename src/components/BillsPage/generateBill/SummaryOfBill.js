import React from 'react';
import {Paper,Typography,Container, Divider,Button,makeStyles} from '@material-ui/core';
import CustomerSuggestion from './CustomerSuggestion';
import OrderDetails from './OrderDetails';
import {useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {asyncAddBill} from '../../../Actions/billsAction'

const useStyle = makeStyles({
    summaryContainer:{  
        height:'65vh'
    },
    title:{
        fontWeight:'700',
        textAlign:'center'
    }
})

function SummaryOfBill(props) {

    const {lineItems, customerInfo,   handleCustomerInfo } = props;
    const classes = useStyle();
    const dispatch= useDispatch();

    const handleGenerateBill =()=>{
        const items = [];

        lineItems.forEach(item=>{
            items.push({product:item._id,quantity:item.quantity})
        })

        if(items.length<=0){
            alert('select the products to be billes')
        }

        if(Object.keys(customerInfo).length <= 0){
            alert('select the customer to be billed for')
        }

        if(items.length > 0 && Object.keys(customerInfo).length > 0){
            const billData = {
                date : new Date(),
                customer : customerInfo._id,
                lineItems : items
            }
            dispatch(asyncAddBill(billData,props.history))
        }
    }



  return (
   <Paper className={classes.summaryContainer}>
       <Typography>Summary of Bill</Typography>
       <Divider/>
       <Container>
           <CustomerSuggestion
            handleCustomerInfo={handleCustomerInfo}
           />
       </Container>
       <Divider />
       <Container>
           <OrderDetails lineItems={lineItems}/>
       </Container>
       <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleGenerateBill}
       >
           Generate Bill
       </Button>
   </Paper>
  )
}

export default withRouter(SummaryOfBill)
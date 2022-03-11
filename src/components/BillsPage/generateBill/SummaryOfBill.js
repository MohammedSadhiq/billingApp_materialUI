import React from 'react';
import {Paper,Typography,Container, Divider,Button,makeStyles} from '@material-ui/core';
import CustomerSuggestion from './CustomerSuggestion'
import OrderDetails from './OrderDetails'



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

    const {items, customerInfo, handleCustomerInfo} = props;
    const classes = useStyle():



  return (
   <Paper className={classes.summaryContainer}>
       <Typography>Summary of Bill</Typography>
       <Divider/>
       <Container>
           <CustomerSuggestion/>
       </Container>
       <Divider />
       <Container>
           <OrderDetails/>
       </Container>
       <Button>
           Generate Bill
       </Button>
   </Paper>
  )
}

export default SummaryOfBill
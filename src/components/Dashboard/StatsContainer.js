import React from 'react';
import {useSelector} from 'react-redux';
import {Typography,Grid,Button,makeStyles} from '@material-ui/core';
import StatsItem from './StatsItem';
import moment from 'moment';

const useStyle = makeStyles({

    statsHeader:{
        fontWeight:700  
    }

})

function StatsContainer(props) {

    const products = useSelector(state=>state.product);
    const customer = useSelector(state=>state.customer);
    const bills = useSelector(state=>state.bills);
    const classes = useStyle();

    const todaysBill = bills.filter(bill=>moment(bill.createdAt).isBetween(moment().startOf('days'),moment()));

    const calculateTotal = (data) =>{
        let total =0;
        data.forEach(bill=>{
            total = total + bill.total;
        })
        return total
    }
    

  return (
    <>
        <Typography variant='h6' className={classes.statsHeader}>Overall Stats</Typography>
        <Grid container spacing={6}>
            <StatsItem statsTitle={'Total Customers'} statsNumber={customer.length}/>
            <StatsItem statsTitle={'Total Products'} statsNumber={products.length}/>
            <StatsItem statsTitle={'Total Orders'} statsNumber={bills.length}/>
        </Grid>
        <Typography vaiant='h6' className={classes.statsHeader}>Daily Stats</Typography>
        <Grid container spacing={6}>
            <StatsItem statsTitle={`Orders Received Today`} statsNumber={todaysBill.length}/>
            <StatsItem statsTitle ={`Amount Received Today`} statsNumber={calculateTotal(todaysBill)}/>
            <StatsItem statsTitle ={`Overall Amount`} statsNumber={calculateTotal(bills)}/>
        </Grid>
    </>
  )
}

export default StatsContainer
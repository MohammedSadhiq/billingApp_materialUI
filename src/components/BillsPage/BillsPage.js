import { Box, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BillsTable from './BillsTable';
import SummarySection from './SummarySection';
import debounce from 'lodash.debounce';

const useStyle = makeStyles({
    container:{
        width:'100vw',
        padding:'2vh 2vw',
        marginLeft:'50px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    billsTableSection:{
        width:'67vw'
    },
    summarySection:{
        marginTop:'60px'
    },
    title:{
        fontWeight:700
    },
    searchField:{
        width:'35%'
    },
    titleContainer:{
        width:'100%'
    }
})

function BillsPage() {

    const [search,setSearch]  = useState('');
    const customers = useSelector(state=>state.customers);
    const bills = useSelector(state=>state.bills);
    const classes = useStyle();
    const [allBills,setAllBills] = useState(bills);

    useEffect(()=>{
        setAllBills(bills)
    },[bills])
    

    console.log('all bills',allBills)

    const getCustomerName = (id)=>{
        if(customers.length > 0){
            const getCustomer = customers.find(cust=>cust.id===id);

            if(getCustomer){
                return getCustomer.name
            }
        }
    }

    const handleSearch=(value)=>{
        
        // const value = e.target.value;
         console.log('handle search triggered',value)
        setSearch(value);
        filteredBills(value)
        console.log(filteredBills(value))
    }

    const resetSearch = ()=>{
        setSearch('')
    }

    function filteredBills(searchValue){
        if(searchValue.length >0){
            const filterBills = bills.filter(bill=>{
                const customerName = getCustomerName(bill.customer)?.toLowerCase();
                return bill._id.includes(searchValue)||customerName?.includes(searchValue.toLowerCase());
            })
            setAllBills(filterBills)
        }
        else{
            setAllBills(bills)
        }
    }

    const deb = useCallback(
        debounce(value=>handleSearch(value),300),
        [handleSearch])

    const optimizedSearchHandle = value =>{
        deb(value)
    }


  return (
      <Container className={classes.container}>
    <Grid container spacing={2}>
        <Grid className={classes.billsTableSection} item lg={9} md={9} sm={12} xs={12}>

            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography className={classes.title}  variant='h3'>Bills</Typography>
                <TextField
                    name='searchField'
                    label='searchField'
                    className={classes.searchField}
                    value={search}
                    onChange={(e)=>handleSearch(e.target.value)}
                    variant='outlined'
                    margin='dense'
                />
            </Box>    
            {
                bills.length > 0 && (<BillsTable
                     resetSearch={resetSearch}
                     bills={allBills}
                     /> )
            }
        </Grid>
        <Grid className={classes.summarySection} item lg={3} xs={3} sm={3} >
            <SummarySection/></Grid>
    </Grid>
    </Container>
  )
}

export default BillsPage

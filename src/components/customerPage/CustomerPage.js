import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {asyncGetCustomers} from '../../Actions/customerAction';
import {Box, Container, Divider, makeStyles, TextField, Typography} from '@material-ui/core'
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import CustomerTable from './CustomerTable';


const useStyle = makeStyles({
  container:{
    width:'100vw',
    padding : '2vh 5vw',
    margingLeft : '10%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  title:{
    fontWeight:'700'
  },
  tableContainer:{
    position : 'fixed',
    marginTop : '175px'
  },
  divider:{
    width:'100%'
  },
  tableContainerTitle:{
    width:'80vw'
  },
  searchField:{
    width:'35%'
  }
})


function CustomerPage(props) {

    const customers = useSelector(state=>state.customers)
    const [search,setSearch] = useState('');
    const [updateCust,setUpdateCust] = useState({});
    const [ customerList, setCustomerList ] = useState(customers);
    const dispatch = useDispatch();
    const classes = useStyle();

    useEffect(()=>{
      dispatch(asyncGetCustomers())
    },[dispatch]);


    useEffect(()=>{
      setCustomerList(customers)
    },[customers])

    function filterCustomers(value){
      if(value.length > 0){
        const filteredCustomes = customers.filter((ele)=>{
          return ele.name.toLowerCase().includes(value.toLowerCase()) || ele.mobile.includes(value)
        })
        setCustomerList(filteredCustomes)
      }   
      else{
        setCustomerList(customers)
      }
    }

    function resetUpdateCust(){
      setUpdateCust({})
    }

    function handleSearchChange(e){
        setSearch(e.target.value)
        filterCustomers(e.target.value)

      }

    function resetSearch(){
      setSearch('');
      filterCustomers('')
    }


    function handleUpdateCustomer(data){
        setUpdateCust(data)
        
    }


  return (
    <Container className={classes.container}>
       <Container disableGutters>
          <Typography>Customer</Typography>
          {
            Object.keys(updateCust).length > 0 ? (<EditCustomer updateCust={updateCust} resetUpdateCust={resetUpdateCust}/>) : (<AddCustomer/>)
          }
         <Divider />
       </Container>

       <Box >
         <Box display='flex'
          flexDirection='row' 
          alignItems='baseline'
           justifyContent='space-between'
         
           >
           <Typography variant='h5'>list of customers - {customers.length}</Typography>
           <TextField 
            variant='outlined'
            margin ='dense'
            value={search}
            label='search customers by name or mobile'
            onChange={handleSearchChange}
            className={classes.searchField}
           />
         </Box>
         <CustomerTable
          customers={customerList}
          resetSearch={resetSearch}
          handleUpdateCustomer={handleUpdateCustomer}
         />
       </Box> 

    </Container>
  )
}

export default CustomerPage
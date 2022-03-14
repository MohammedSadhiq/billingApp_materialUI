import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Box, Button, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteBill } from '../../Actions/billsAction';


const useStyle = makeStyles({
    tableHeader:{
        background:'black',
        color:'white'
    },
    table:{
        maxHeight:'575px'
    },
    viewBtn:{
        textDecoration:'none'
    }
})

function BillsTable(props) {

    const {bills,resetSearch } = props;
    const dispatch = useDispatch();
    const customers = useSelector(state=>state.customers)
    const classes = useStyle();

    const handleDelete =(id)=>{
        resetSearch();
        dispatch(asyncDeleteBill(id))
    }

    const getCustomerName = (id)=>{
        if(customers.length > 0){
            const getCustomer = customers.find(cust=>cust.id===id);

            if(getCustomer){
                return getCustomer.name
            }
        }
    }

    

  return (
    <TableContainer className = {classes.table} >
        <Table stickyHeader  size='small'>
            <TableHead >
                <TableRow >
                    <TableCell className={classes.tableHeader} align='center'>S.No</TableCell>
                    <TableCell className={classes.tableHeader} align='center'>Order ID</TableCell>
                    <TableCell className={classes.tableHeader} align='center'>Customer Name</TableCell>
                    <TableCell className={classes.tableHeader} align='center'>Date & Time</TableCell>
                    <TableCell className={classes.tableHeader} align='center'>View/Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    { (customers?.length>0)?(  <>{
                        bills.map((bill,index)=>{
                            return (<TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{bill._id}</TableCell>
                                <TableCell>{getCustomerName(bill.customer)}</TableCell>
                                <TableCell>{bill.createdAt && moment(bill.createdAt).format('DD/MM/YYYY hh:mm:A')}</TableCell>
                                <TableCell align='center'>
                                    <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                                        <Link to={`bills/${bill._id}`}>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                            >
                                                View
                                            </Button>    
                                        </Link>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={()=>{handleDelete(bill._id)}}
                                        >
                                            Delete
                                        </Button>
                                    </Box>    
                                </TableCell>
                            </TableRow>)
                        })}
                        </>):(<div>loading</div>)
                    }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default BillsTable
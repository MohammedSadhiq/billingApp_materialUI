import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import {TableContainer,TableHead,TableRow,TableCell,TableBody,Table,makeStyles, TableFooter} from '@material-ui/core'



const useStyle = makeStyles({
  tableHeaderFooter:{
    color:'black',
    fontWeight:600
  }
})


function ViewOrderTable(props) {

  const {lineItems,total} = props;
  const products = useSelector(state=>state.product);
  const classes = useStyle();

 const getProductName=(id)=>{
      const product = products.find(ele=>ele._id === id)
      if(product){
        return product.name
      }
 }

  return (
    <TableContainer>
      <Table>
        <TableHead>
            <TableRow >
              <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
              <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
              <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
              <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
              <TableCell className={classes.tableHeaderFooter}>Sub Total</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {
           lineItems.length >0 ? ( lineItems.map((list,index)=>{
            return(<TableRow key={list._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{getProductName(list.product)}</TableCell>
              <TableCell>{list.price}</TableCell>
              <TableCell>{list.quantity}</TableCell>
              <TableCell>{list.subTotal}</TableCell>
            </TableRow>)
          })):(<TableRow>
            <TableCell>No items ordered</TableCell>
          </TableRow>)
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className={classes.tableHeaderFooter}>Total Amount</TableCell>
            <TableCell className={classes.tableHeaderFooter}>{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default ViewOrderTable
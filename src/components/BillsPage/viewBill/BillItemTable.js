import React from 'react';
import {TableContainer,Table,TableHead,TableRow,TableBody,TableCell,makeStyles } from '@material-ui/core';
import {useSelector} from 'react-redux';


const useStyle = makeStyles({

    tableHeaderFooter:{
        color:'black',
        fontWeight:600,
        fontSize:14
    }

})

function BillItemTable(props) {

    const {items,total} = props;
    const classes = useStyle();
    const products = useSelector(state=>state.product);

    const getProductName=(id)=>{
        const selectedProduct = products.find(prod=>prod._id===id)
        return selectedProduct.name
    }

  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                    <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
                    <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
                    <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
                    <TableCell className={classes.tableHeaderFooter}>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    items.map((item,index)=>{
                        return (<TableRow key={item._id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{getProductName(item.product)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.subTotal}</TableCell>
                        </TableRow>)
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default BillItemTable
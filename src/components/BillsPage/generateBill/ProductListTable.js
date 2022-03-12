import React from 'react';
import {Container,TableContainer, Table, TableHead, IconButton,TableRow, TableCell, TableBody, TableFooter,makeStyles} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyle = makeStyles({

    tableHeaderFooter:{
        color:'black',
        fontWeight:600,
        fontSize:14
    }

})

function ProductListTable(props) {

    const {lineItems,handleChangeQuantity,handleRemoveLineItem} = props;
    const classes = useStyle();

    const calculateTotal = (data) =>{
        let total = 0;

        data.forEach(item=>total = total + item.subTotal);

        return total

    }

    console.log('items in productListTable',lineItems.length);

  return (
    <Container>
        {
            lineItems.length > 0 && (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Sub Total</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            lineItems.map((product,index)=>{
                                return(<TableRow key={product._id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size='small'
                                            onClick={()=>{handleChangeQuantity(product,'minus')}}
                                            disabled ={product.quantity===1 ? true:false}
                                        >
                                            <RemoveIcon/>
                                        </IconButton>
                                        {
                                            product.quantity
                                        }
                                        <IconButton
                                            size='small'
                                            onClick={()=>handleChangeQuantity(product,'add')}

                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{product.subTotal}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size='small'
                                            onClick={()=>{handleRemoveLineItem(product)}}
                                        >
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)

                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className={classes.tableHeaderFooter}>Total Amount</TableCell>
                            <TableCell className={classes.tableHeaderFooter}>{calculateTotal(lineItems)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            )
        }
    </Container>
  )
}

export default ProductListTable
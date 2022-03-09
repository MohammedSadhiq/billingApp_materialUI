import { TableContainer, Table, Paper, TableHead,TableRow,TableCell, TableBody, Button, makeStyles } from '@material-ui/core'
import React from 'react';



const useStyle = makeStyles({
    table:{
        maxHeight:'380px'
    },
    nameHeader:{
        width:'35%'
    },
    tableBtns:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    tableHeader:{
        background:'black',
        color:'white'
    },
    headerName:{
        color:'white'
    }
})

function ProductTable(props) {

    const {products,handleViewProduct,handleUpdateProduct,handleDeleteProduct,resetSearch}= props;
    const classes = useStyle();

    console.log('products in table',products);

  return (
    <TableContainer className={classes.table} component={Paper}>
        <Table stickyHeader size='small'>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHeader}>ID</TableCell>
                    <TableCell className={classes.tableHeader}>Product Name</TableCell>
                    <TableCell className={classes.tableHeader}>Price</TableCell>
                    <TableCell className={classes.tableHeader}>View</TableCell>
                    <TableCell className={classes.tableHeader}>Action</TableCell>
                </TableRow>
                
            </TableHead>

            <TableBody>
                {
                    products.map((prod,index)=>{
                        return(<TableRow  hover key={index}>
                            <TableCell>{prod._id}</TableCell>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.price}</TableCell>
                            <TableCell className={classes.tableBtns}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={()=>{handleViewProduct(prod._id)}}
                                >
                                    View
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={()=>{
                                        handleUpdateProduct(prod)
                                        resetSearch()
                                    }}
                                >
                                    Update
                                </Button>
                                <Button 
                                    variant ='contained'
                                    color = 'secondary'
                                    onClick={()=>{
                                        handleDeleteProduct(prod._id)
                                        resetSearch();
                                    }}
                                    
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>)
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ProductTable
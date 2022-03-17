import { Container, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import ProductForm from './ProductForm';

const useStyle = makeStyles({
    container:{
        padding:'10px 0',

    },
    title:{
        fontWeight:700
    }
})

function EditProduct(props) {

    const {updateProduct,resetUpdateProduct} = props;
    const classes = useStyle();

    console.log('edit product triggerd',updateProduct)

  return (
    <Container className={classes.container}>
        <Typography variant='h6' className={classes.title}>Edit Product</Typography>
        <ProductForm 
         name={updateProduct.name}
         price={updateProduct.price}
         _id={updateProduct._id}
         resetUpdateProduct={resetUpdateProduct}/>
    </Container>
  )
}

export default EditProduct
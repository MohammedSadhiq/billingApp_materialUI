import { Box, Paper, Typography,Button, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { asyncProductDetail, asyncDeleteProducts } from '../../Actions/productAction';
import moment from 'moment';


const useStyle = makeStyles({
    container:{
        display:'grid',
        placeItems:'center',
        widht:'350px',
        height:'230px',
        padding:'10px',
        marginTop:'30px'
    },
    content:{
        marginTop:'30px'
    },
    detailsTitle:{
        textAlign:'center',
        fontWeight:700
    },
    noProduct:{
        width:'150px',
        wordBreak:'break-word',
        color:'grey'
    }
})


function ProductDetails(props) {
    const {productId,handleUpdateProduct,resetViewProduct} = props;
    const [details,setDetails] = useState({});
    const dispatch = useDispatch();
    const classes = useStyle();

    const handleDetailChange=(data)=>{
        setDetails(data)
    }

    const handleClose=()=>{
        resetViewProduct();
    }

    const handleRemove=(id)=>{
        dispatch(asyncDeleteProducts(id))
        resetViewProduct();
    }

    const handleUpdate=(data)=>{
        handleUpdateProduct(data);
        resetViewProduct()
    }

    useEffect(()=>{
        if(productId){
            dispatch(asyncProductDetail(productId,handleDetailChange))
            
        }
        
    },[productId,dispatch])

  return (
    <Paper className={classes.container}>
        {
            productId ? (<Box>
                <Typography className={classes.detailsTitle}>Product Details</Typography>
                <Box className={classes.content}>
                    <Typography variant='h6'>Name : {details.name}</Typography>
                    <Typography variant='h6'>Price : {details.price}</Typography>
                    <Typography variant='h6'>Added On  : {moment(details.createdAt).format('hh:mm A,DD/MM/YYYY')}</Typography>
                    <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={()=>{handleUpdate(details)}}
                        >Update</Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={()=>{handleRemove(productId)}}
                        >Remove</Button>
                        <Button
                            variant='outlined'
                            onClick={handleClose}
                        >Cancel</Button>
                    </Box>
                </Box>
                </Box>):(<Typography className={classes.noProduct} variant='h6'>Select Product to view Details</Typography>  )
        }
    </Paper>
  )
}

export default ProductDetails